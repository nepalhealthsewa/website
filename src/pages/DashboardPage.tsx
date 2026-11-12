import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Droplet,
  AlertTriangle,
  Calendar,
  Plus,
  Phone,
  MapPin,
  Clock,
  FileSpreadsheet,
  ShieldCheck,
  ChevronRight,
  MessageSquare,
  UserCheck,
  Briefcase,
  Edit,
  Trash2,
  X,
  PhoneCall,
  Eye,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowLeft,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import {
  useGetDonorsQuery,
  useAddDonorMutation,
  useToggleDonorAvailabilityMutation,
  useGetEmergencyTicketsQuery,
  useCreateEmergencyTicketMutation,
  useUpdateEmergencyTicketStatusMutation,
  useDeleteEmergencyTicketMutation,
  useGetInquiriesQuery,
  useSubmitInquiryMutation,
  useUpdateInquiryStatusMutation,
  useDeleteInquiryMutation,
  useGetTeamMembersQuery,
  useAddTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useGetVolunteersQuery,
  useToggleVolunteerStandbyMutation,
  useAddVolunteerMutation,
  useGetCampaignsQuery,
} from '../services/healthApi';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/common/SEO';
import { DataTable, DataTableColumn } from '../components/ui/DataTable';
import {
  BloodDonor,
  BloodGroup,
  Gender,
  EmergencyTicket,
  ContactInquiry,
  TeamMember,
  VolunteerProfile,
  Campaign,
  InquiryStatus,
  InquiryCategory,
  VolunteerStatus,
  VolunteerBadge,
  EmergencyServiceType,
} from '../types';

export type DashboardSection =
  | 'overview'
  | 'emergency'
  | 'inquiries'
  | 'volunteers'
  | 'team'
  | 'donors'
  | 'campaigns';

const BLOOD_GROUPS: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
const DISTRICTS_NEPAL = ['Parsa', 'Bara', 'Kathmandu', 'Chitwan', 'Dhanusha', 'Morang', 'Rautahat', 'Makwanpur'];

export const DashboardPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('nhs_dashboard_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const toggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarMobileOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => {
        const next = !prev;
        try {
          localStorage.setItem('nhs_dashboard_sidebar_collapsed', String(next));
        } catch {}
        return next;
      });
    }
  };

  // Keyboard shortcut (Ctrl+B / Cmd+B) to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kathmandu',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Queries
  const { data: donorsData } = useGetDonorsQuery();
  const { data: ticketsData } = useGetEmergencyTicketsQuery();
  const { data: inquiriesData } = useGetInquiriesQuery();
  const { data: volunteersData } = useGetVolunteersQuery();
  const { data: teamData } = useGetTeamMembersQuery();
  const { data: campaignsData } = useGetCampaignsQuery();

  // Mutations
  const [addDonor, { isLoading: isAddingDonor }] = useAddDonorMutation();
  const [toggleDonorAvailability] = useToggleDonorAvailabilityMutation();
  const [createEmergencyTicket, { isLoading: isCreatingTicket }] = useCreateEmergencyTicketMutation();
  const [updateEmergencyStatus] = useUpdateEmergencyTicketStatusMutation();
  const [deleteEmergencyTicket] = useDeleteEmergencyTicketMutation();

  const [submitInquiry, { isLoading: isSubmittingInquiry }] = useSubmitInquiryMutation();
  const [updateInquiryStatus] = useUpdateInquiryStatusMutation();
  const [deleteInquiry] = useDeleteInquiryMutation();

  const [addVolunteer, { isLoading: isAddingVolunteer }] = useAddVolunteerMutation();
  const [toggleVolunteerStandby] = useToggleVolunteerStandbyMutation();

  const [addTeamMember, { isLoading: isAddingTeam }] = useAddTeamMemberMutation();
  const [updateTeamMember] = useUpdateTeamMemberMutation();
  const [deleteTeamMember] = useDeleteTeamMemberMutation();

  // Modals state
  const [showDonorModal, setShowDonorModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<EmergencyTicket | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);

  // Filters for Emergency Tickets
  const [ticketStatusFilter, setTicketStatusFilter] = useState<string>('ALL');
  const [ticketUrgencyFilter, setTicketUrgencyFilter] = useState<string>('ALL');
  const [ticketSewaFilter, setTicketSewaFilter] = useState<string>('ALL');
  const [ticketSearch, setTicketSearch] = useState('');

  // Filters for Inquiries
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('ALL');
  const [inquiryCategoryFilter, setInquiryCategoryFilter] = useState<string>('ALL');
  const [inquirySearch, setInquirySearch] = useState('');

  // Filters for Volunteers
  const [volunteerStatusFilter, setVolunteerStatusFilter] = useState<string>('ALL');
  const [volunteerDistrictFilter, setVolunteerDistrictFilter] = useState<string>('ALL');
  const [volunteerStandbyOnly, setVolunteerStandbyOnly] = useState<boolean>(false);
  const [volunteerSearch, setVolunteerSearch] = useState('');

  // Filters for Team
  const [teamDepartmentFilter, setTeamDepartmentFilter] = useState<string>('ALL');
  const [teamSearch, setTeamSearch] = useState('');

  // Filters for Donors Table
  const [donorSearch, setDonorSearch] = useState('');
  const [donorGroupFilter, setDonorGroupFilter] = useState<string>('ALL');
  const [donorDistrictFilter, setDonorDistrictFilter] = useState<string>('ALL');
  const [donorAvailableOnly, setDonorAvailableOnly] = useState<boolean>(false);

  // Forms State
  const [newTicket, setNewTicket] = useState({
    patientName: '',
    patientAge: 45,
    gender: 'Male' as Gender,
    patientAddress: '',
    hospitalName: '',
    hospitalAddress: '',
    hospitalContact: '',
    contactName: '',
    contactAddress: '',
    contactMobile: '',
    contactEmail: '',
    sewaType: 'Blood' as EmergencyServiceType,
    bloodGroup: 'O+' as BloodGroup,
    unitsNeeded: 1,
    urgency: 'Immediate (Within 2 hrs)' as 'Immediate (Within 2 hrs)' | 'Today (Within 6 hrs)' | 'Scheduled',
    message: '',
  });

  const [newInquiry, setNewInquiry] = useState({
    name: '',
    mobile: '',
    email: '',
    category: 'General Feedback' as InquiryCategory,
    message: '',
  });

  const [newVolunteer, setNewVolunteer] = useState({
    name: '',
    role: 'Field Responder',
    district: 'Parsa',
    city: 'Birgunj',
    mobile: '',
    email: '',
    bloodGroup: 'O+' as BloodGroup,
    status: 'Active' as VolunteerStatus,
    skills: 'Cold Chain Transport, Hospital Liaison',
    totalDrivesAttended: 0,
    totalDonations: 0,
    badge: 'Youth Lead' as VolunteerBadge,
    emergencyStandby: true,
  });

  const [newTeam, setNewTeam] = useState({
    name: '',
    role: '',
    bio: '',
    image: '/img/logo.af0d533f.png',
    department: 'Emergency Operations' as TeamMember['department'],
    phone: '',
    email: '',
    isCore: true,
    socials: {
      facebook: '',
      instagram: '',
      twitter: '',
    },
  });

  const [newDonor, setNewDonor] = useState({
    firstName: '',
    lastName: '',
    bloodGroup: 'O+' as BloodGroup,
    gender: 'Male' as Gender,
    age: 25,
    district: 'Parsa',
    city: 'Birgunj',
    mobile: '',
    email: '',
  });

  const donors = donorsData?.donors || [];
  const tickets = ticketsData || [];
  const inquiries = inquiriesData || [];
  const volunteers = volunteersData || [];
  const team = teamData || [];
  const campaigns = campaignsData || [];

  // Summary Metrics
  const totalDonors = donors.length;
  const availableDonors = donors.filter((d) => d.isAvailable).length;
  const availabilityRate = totalDonors > 0 ? Math.round((availableDonors / totalDonors) * 100) : 0;
  const rareDonorsCount = donors.filter((d) => ['O-', 'AB-', 'A-', 'B-'].includes(d.bloodGroup)).length;

  const pendingTickets = tickets.filter((t) => t.status === 'Pending').length;
  const inProgressTickets = tickets.filter((t) => t.status === 'In Progress').length;
  const activeTickets = pendingTickets + inProgressTickets;
  const urgentTickets = tickets.filter((t) => t.urgency.startsWith('Immediate')).length;

  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;
  const activeVolunteersCount = volunteers.filter((v) => v.status === 'Active').length;
  const standbyVolunteersCount = volunteers.filter((v) => v.emergencyStandby).length;

  // Donor distribution by blood group
  const bloodGroupStats = useMemo(() => {
    return BLOOD_GROUPS.map((group) => {
      const match = donors.filter((d) => d.bloodGroup === group);
      const available = match.filter((d) => d.isAvailable).length;
      let status: 'Stable' | 'Moderate' | 'Low' | 'Critical' = 'Stable';
      if (available === 0) status = 'Critical';
      else if (available === 1) status = 'Low';
      else if (available < 3) status = 'Moderate';

      return {
        group,
        total: match.length,
        available,
        status,
        isRare: ['O-', 'AB-', 'A-', 'B-'].includes(group),
      };
    });
  }, [donors]);

  // Filtered Donors
  const filteredDonors = useMemo(() => {
    return donors.filter((d) => {
      if (donorGroupFilter !== 'ALL' && d.bloodGroup !== donorGroupFilter) return false;
      if (donorDistrictFilter !== 'ALL' && d.district.toLowerCase() !== donorDistrictFilter.toLowerCase()) return false;
      if (donorAvailableOnly && !d.isAvailable) return false;
      if (donorSearch.trim()) {
        const q = donorSearch.toLowerCase().trim();
        return (
          d.firstName.toLowerCase().includes(q) ||
          d.lastName.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q) ||
          d.district.toLowerCase().includes(q) ||
          d.mobile.includes(q)
        );
      }
      return true;
    });
  }, [donors, donorGroupFilter, donorDistrictFilter, donorAvailableOnly, donorSearch]);

  // Filtered Emergency Tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      if (ticketStatusFilter !== 'ALL' && t.status !== ticketStatusFilter) return false;
      if (ticketUrgencyFilter !== 'ALL' && t.urgency !== ticketUrgencyFilter) return false;
      if (ticketSewaFilter !== 'ALL' && t.sewaType !== ticketSewaFilter) return false;
      if (ticketSearch.trim()) {
        const q = ticketSearch.toLowerCase().trim();
        return (
          t.ticketNumber.toLowerCase().includes(q) ||
          t.patientName.toLowerCase().includes(q) ||
          t.hospitalName.toLowerCase().includes(q) ||
          t.contactMobile.includes(q) ||
          (t.bloodGroup && t.bloodGroup.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [tickets, ticketStatusFilter, ticketUrgencyFilter, ticketSewaFilter, ticketSearch]);

  // Filtered Inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((i) => {
      if (inquiryStatusFilter !== 'ALL' && i.status !== inquiryStatusFilter) return false;
      if (inquiryCategoryFilter !== 'ALL' && i.category !== inquiryCategoryFilter) return false;
      if (inquirySearch.trim()) {
        const q = inquirySearch.toLowerCase().trim();
        return (
          i.ticketId.toLowerCase().includes(q) ||
          i.name.toLowerCase().includes(q) ||
          i.mobile.includes(q) ||
          i.message.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [inquiries, inquiryStatusFilter, inquiryCategoryFilter, inquirySearch]);

  // Filtered Volunteers
  const filteredVolunteers = useMemo(() => {
    return volunteers.filter((v) => {
      if (volunteerStatusFilter !== 'ALL' && v.status !== volunteerStatusFilter) return false;
      if (volunteerDistrictFilter !== 'ALL' && v.district.toLowerCase() !== volunteerDistrictFilter.toLowerCase()) return false;
      if (volunteerStandbyOnly && !v.emergencyStandby) return false;
      if (volunteerSearch.trim()) {
        const q = volunteerSearch.toLowerCase().trim();
        return (
          v.name.toLowerCase().includes(q) ||
          v.role.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q) ||
          v.mobile.includes(q) ||
          v.bloodGroup.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [volunteers, volunteerStatusFilter, volunteerDistrictFilter, volunteerStandbyOnly, volunteerSearch]);

  // Filtered Team
  const filteredTeam = useMemo(() => {
    return team.filter((m) => {
      if (teamDepartmentFilter !== 'ALL' && m.department !== teamDepartmentFilter) return false;
      if (teamSearch.trim()) {
        const q = teamSearch.toLowerCase().trim();
        return (
          m.name.toLowerCase().includes(q) ||
          m.role.toLowerCase().includes(q) ||
          m.bio.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [team, teamDepartmentFilter, teamSearch]);

  // Handlers
  const handleToggleAvailability = async (id: string, name: string) => {
    try {
      const res = await toggleDonorAvailability(id).unwrap();
      toast.success(`${name} marked as ${res.isAvailable ? 'AVAILABLE' : 'UNAVAILABLE'}`);
    } catch {
      toast.error('Failed to update donor status');
    }
  };

  const handleUpdateStatus = async (id: string, status: EmergencyTicket['status']) => {
    try {
      await updateEmergencyStatus({ id, status }).unwrap();
      toast.success(`Ticket status updated to "${status}"`);
      if (status === 'Fulfilled') {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    } catch {
      toast.error('Failed to update ticket status');
    }
  };

  const handleDeleteTicket = async (id: string, ticketNumber: string) => {
    if (!window.confirm(`Delete ticket ${ticketNumber}?`)) return;
    try {
      await deleteEmergencyTicket(id).unwrap();
      toast.success(`Ticket ${ticketNumber} deleted`);
      if (selectedTicket?.id === id) setSelectedTicket(null);
    } catch {
      toast.error('Failed to delete ticket');
    }
  };

  const handleCreateTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.patientName.trim()) {
      toast.error('Please enter patient name.');
      return;
    }
    if (!newTicket.hospitalName.trim()) {
      toast.error('Please enter hospital name.');
      return;
    }
    if (!newTicket.contactMobile.trim() || newTicket.contactMobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      const created = await createEmergencyTicket({
        patientName: newTicket.patientName.trim(),
        patientAge: Number(newTicket.patientAge) || 30,
        gender: newTicket.gender,
        patientAddress: newTicket.patientAddress.trim() || 'Parsa',
        hospitalName: newTicket.hospitalName.trim(),
        hospitalAddress: newTicket.hospitalAddress.trim() || 'Birgunj',
        hospitalContact: newTicket.hospitalContact.trim() || '051-521993',
        contactName: newTicket.contactName.trim() || newTicket.patientName.trim(),
        contactAddress: newTicket.contactAddress.trim() || 'Birgunj',
        contactMobile: newTicket.contactMobile.trim(),
        contactEmail: newTicket.contactEmail.trim() || undefined,
        sewaType: newTicket.sewaType,
        bloodGroup: newTicket.sewaType === 'Blood' ? newTicket.bloodGroup : undefined,
        unitsNeeded: newTicket.sewaType === 'Blood' ? Number(newTicket.unitsNeeded) || 1 : undefined,
        urgency: newTicket.urgency,
        message: newTicket.message.trim() || undefined,
      }).unwrap();

      toast.success(`Emergency Ticket #${created.ticketNumber} created successfully!`);
      setShowTicketModal(false);
      setNewTicket({
        patientName: '',
        patientAge: 45,
        gender: 'Male',
        patientAddress: '',
        hospitalName: '',
        hospitalAddress: '',
        hospitalContact: '',
        contactName: '',
        contactAddress: '',
        contactMobile: '',
        contactEmail: '',
        sewaType: 'Blood',
        bloodGroup: 'O+',
        unitsNeeded: 1,
        urgency: 'Immediate (Within 2 hrs)',
        message: '',
      });
    } catch {
      toast.error('Failed to create emergency ticket');
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInquiry.name.trim() || !newInquiry.mobile.trim() || !newInquiry.message.trim()) {
      toast.error('Please fill in Name, Mobile, and Message.');
      return;
    }
    try {
      const created = await submitInquiry(newInquiry).unwrap();
      toast.success(`Inquiry #${created.ticketId} logged successfully!`);
      setShowInquiryModal(false);
      setNewInquiry({
        name: '',
        mobile: '',
        email: '',
        category: 'General Feedback',
        message: '',
      });
    } catch {
      toast.error('Failed to log inquiry');
    }
  };

  const handleUpdateInquiryStatus = async (id: string, status: InquiryStatus, responseNotes?: string) => {
    try {
      await updateInquiryStatus({ id, status, responseNotes }).unwrap();
      toast.success(`Inquiry marked as ${status}`);
    } catch {
      toast.error('Failed to update inquiry');
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Delete this inquiry record?')) return;
    try {
      await deleteInquiry(id).unwrap();
      toast.success('Inquiry deleted');
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    } catch {
      toast.error('Failed to delete inquiry');
    }
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVolunteer.name.trim() || !newVolunteer.mobile.trim()) {
      toast.error('Please enter Volunteer Name and Phone.');
      return;
    }
    try {
      await addVolunteer({
        name: newVolunteer.name.trim(),
        role: newVolunteer.role.trim(),
        district: newVolunteer.district,
        city: newVolunteer.city.trim(),
        mobile: newVolunteer.mobile.trim(),
        email: newVolunteer.email.trim() || undefined,
        bloodGroup: newVolunteer.bloodGroup,
        status: newVolunteer.status,
        skills: newVolunteer.skills.split(',').map((s) => s.trim()).filter(Boolean),
        totalDrivesAttended: Number(newVolunteer.totalDrivesAttended) || 0,
        totalDonations: Number(newVolunteer.totalDonations) || 0,
        joinedDate: new Date().toISOString().split('T')[0],
        badge: newVolunteer.badge,
        emergencyStandby: newVolunteer.emergencyStandby,
      }).unwrap();

      toast.success(`${newVolunteer.name} registered as Volunteer!`);
      setShowVolunteerModal(false);
      setNewVolunteer({
        name: '',
        role: 'Field Responder',
        district: 'Parsa',
        city: 'Birgunj',
        mobile: '',
        email: '',
        bloodGroup: 'O+',
        status: 'Active',
        skills: 'Cold Chain Transport, Hospital Liaison',
        totalDrivesAttended: 0,
        totalDonations: 0,
        badge: 'Youth Lead',
        emergencyStandby: true,
      });
    } catch {
      toast.error('Failed to add volunteer');
    }
  };

  const handleToggleVolunteerStandby = async (id: string, name: string) => {
    try {
      const res = await toggleVolunteerStandby(id).unwrap();
      toast.success(`${name} ${res.emergencyStandby ? 'placed on EMERGENCY STANDBY' : 'removed from standby'}`);
    } catch {
      toast.error('Failed to toggle volunteer standby');
    }
  };

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeam.name.trim() || !newTeam.role.trim()) {
      toast.error('Please enter Name and Role.');
      return;
    }
    try {
      if (editingTeamMember) {
        await updateTeamMember({
          ...editingTeamMember,
          name: newTeam.name.trim(),
          role: newTeam.role.trim(),
          bio: newTeam.bio.trim(),
          department: newTeam.department,
          phone: newTeam.phone.trim(),
          email: newTeam.email.trim(),
          isCore: newTeam.isCore,
        }).unwrap();
        toast.success(`Team member ${newTeam.name} updated successfully!`);
        setEditingTeamMember(null);
      } else {
        await addTeamMember({
          name: newTeam.name.trim(),
          role: newTeam.role.trim(),
          bio: newTeam.bio.trim() || 'Dedicated to community health & voluntary blood coordination in Nepal.',
          image: newTeam.image || '/img/logo.af0d533f.png',
          department: newTeam.department,
          phone: newTeam.phone.trim(),
          email: newTeam.email.trim(),
          isCore: newTeam.isCore,
          status: 'Active',
          socials: newTeam.socials,
        }).unwrap();
        toast.success(`New team member ${newTeam.name} added!`);
      }
      setShowTeamModal(false);
      setNewTeam({
        name: '',
        role: '',
        bio: '',
        image: '/img/logo.af0d533f.png',
        department: 'Emergency Operations',
        phone: '',
        email: '',
        isCore: true,
        socials: { facebook: '', instagram: '', twitter: '' },
      });
    } catch {
      toast.error('Failed to save team member');
    }
  };

  const handleDeleteTeam = async (id: string, name: string) => {
    if (!window.confirm(`Remove ${name} from team directory?`)) return;
    try {
      await deleteTeamMember(id).unwrap();
      toast.success(`${name} removed from team`);
    } catch {
      toast.error('Failed to delete team member');
    }
  };

  const handleDonorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonor.firstName.trim() || !newDonor.mobile.trim()) {
      toast.error('Please fill in First Name and 10-digit mobile number.');
      return;
    }
    try {
      await addDonor({
        firstName: newDonor.firstName.trim(),
        lastName: newDonor.lastName.trim(),
        bloodGroup: newDonor.bloodGroup,
        gender: newDonor.gender,
        age: Number(newDonor.age) || 25,
        district: newDonor.district,
        city: newDonor.city.trim() || 'Birgunj',
        mobile: newDonor.mobile.trim(),
        email: newDonor.email.trim() || undefined,
      }).unwrap();

      toast.success(`Donor ${newDonor.firstName} ${newDonor.lastName} registered successfully!`);
      setShowDonorModal(false);
      setNewDonor({
        firstName: '',
        lastName: '',
        bloodGroup: 'O+',
        gender: 'Male',
        age: 25,
        district: 'Parsa',
        city: 'Birgunj',
        mobile: '',
        email: '',
      });
    } catch {
      toast.error('Failed to register donor');
    }
  };

  const exportTicketsCSV = () => {
    const headers = [
      'Ticket Number',
      'Patient Name',
      'Sewa Type',
      'Blood Group',
      'Hospital',
      'Contact',
      'Urgency',
      'Status',
      'Date',
    ];

    const rows = tickets.map((t) => [
      t.ticketNumber,
      `"${t.patientName.replace(/"/g, '""')}"`,
      t.sewaType,
      t.bloodGroup || 'N/A',
      `"${t.hospitalName.replace(/"/g, '""')}"`,
      t.contactMobile,
      `"${t.urgency}"`,
      t.status,
      t.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nepal_health_sewa_operations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Operations report exported to CSV!');
  };

  const navMenuItems: {
    id: DashboardSection;
    label: string;
    icon: React.ElementType;
    badge?: number | string;
    badgeColor?: string;
  }[] = [
    { id: 'overview', label: 'Executive Overview', icon: Activity },
    {
      id: 'emergency',
      label: 'Emergency Requests',
      icon: AlertTriangle,
      badge: activeTickets > 0 ? activeTickets : undefined,
      badgeColor: 'bg-red-500 text-white',
    },
    {
      id: 'inquiries',
      label: 'Citizen Enquiries',
      icon: MessageSquare,
      badge: newInquiriesCount > 0 ? newInquiriesCount : undefined,
      badgeColor: 'bg-sky-500 text-white',
    },
    {
      id: 'volunteers',
      label: 'Volunteers Force',
      icon: UserCheck,
      badge: standbyVolunteersCount > 0 ? `${standbyVolunteersCount} Alert` : undefined,
      badgeColor: 'bg-emerald-500 text-white',
    },
    { id: 'team', label: 'Team Management', icon: Briefcase },
    {
      id: 'donors',
      label: 'Blood Donors Pool',
      icon: Droplet,
      badge: availableDonors > 0 ? `${availableDonors} Ready` : undefined,
      badgeColor: 'bg-slate-700 text-slate-200',
    },
    { id: 'campaigns', label: 'Camps & Drives', icon: Calendar, badge: campaigns.length },
  ];

  // DataTable Column Definitions
  const emergencyColumns: DataTableColumn<EmergencyTicket>[] = useMemo(
    () => [
      {
        key: 'ticketNumber',
        title: 'Ticket & Service',
        sortable: true,
        render: (t) => (
          <div>
            <div className="font-mono font-bold text-slate-900">{t.ticketNumber}</div>
            <div className="text-[10px] font-bold text-rose-600 mt-0.5">
              {t.sewaType} {t.bloodGroup ? `(${t.bloodGroup})` : ''}
            </div>
          </div>
        ),
      },
      {
        key: 'patientName',
        title: 'Patient & Age',
        sortable: true,
        render: (t) => (
          <div>
            <div className="font-bold text-slate-900">{t.patientName}</div>
            <div className="text-[11px] text-slate-500">
              {t.patientAge}y · {t.gender}
            </div>
          </div>
        ),
      },
      {
        key: 'hospitalName',
        title: 'Hospital & Location',
        sortable: true,
        render: (t) => (
          <div>
            <div className="font-medium text-slate-900">{t.hospitalName}</div>
            <div className="text-[11px] text-slate-500">{t.hospitalAddress}</div>
          </div>
        ),
      },
      {
        key: 'urgency',
        title: 'Urgency',
        sortable: true,
        render: (t) => (
          <span
            className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] ${
              t.urgency.startsWith('Immediate')
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : t.urgency.startsWith('Today')
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {t.urgency}
          </span>
        ),
      },
      {
        key: 'contact',
        title: 'Contact Person',
        render: (t) => (
          <div>
            <div className="font-medium text-slate-800">{t.contactName}</div>
            <a
              href={`tel:${t.contactMobile}`}
              className="font-mono font-bold text-rose-600 hover:underline"
            >
              {t.contactMobile}
            </a>
          </div>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        sortable: true,
        render: (t) => (
          <select
            value={t.status}
            onChange={(e) =>
              handleUpdateStatus(t.id, e.target.value as EmergencyTicket['status'])
            }
            className="px-2 py-1 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-900 cursor-pointer shadow-2xs"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Fulfilled">Fulfilled</option>
            <option value="Closed">Closed</option>
          </select>
        ),
      },
      {
        key: 'actions',
        title: 'Actions',
        align: 'right',
        render: (t) => (
          <div className="inline-flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedTicket(t)}
              className="h-7 px-2 text-[11px] bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Details
            </Button>
            <button
              onClick={() => handleDeleteTicket(t.id, t.ticketNumber)}
              className="p-1.5 rounded-md text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Delete Ticket"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const inquiryColumns: DataTableColumn<ContactInquiry>[] = useMemo(
    () => [
      {
        key: 'ticketId',
        title: 'Ticket ID & Date',
        sortable: true,
        render: (inq) => (
          <div>
            <div className="font-mono font-bold text-slate-900">{inq.ticketId}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{inq.createdAt}</div>
          </div>
        ),
      },
      {
        key: 'name',
        title: 'Citizen Contact',
        sortable: true,
        render: (inq) => (
          <div>
            <div className="font-bold text-slate-900">{inq.name}</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <a
                href={`tel:${inq.mobile}`}
                className="font-mono text-rose-600 font-semibold hover:underline"
              >
                {inq.mobile}
              </a>
              {inq.email && <span>· {inq.email}</span>}
            </div>
          </div>
        ),
      },
      {
        key: 'category',
        title: 'Category',
        sortable: true,
        render: (inq) => (
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
            {inq.category}
          </span>
        ),
      },
      {
        key: 'message',
        title: 'Inquiry Message',
        render: (inq) => (
          <div className="max-w-md">
            <p className="text-xs text-slate-600 line-clamp-2">"{inq.message}"</p>
            {inq.responseNotes && (
              <div className="mt-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <strong>Reply:</strong> {inq.responseNotes}
              </div>
            )}
          </div>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        sortable: true,
        render: (inq) => (
          <select
            value={inq.status}
            onChange={(e) =>
              handleUpdateInquiryStatus(inq.id, e.target.value as InquiryStatus)
            }
            className="text-[11px] font-bold px-2 py-1 bg-white border border-slate-200 text-slate-900 rounded-md cursor-pointer shadow-2xs"
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Archived">Archived</option>
          </select>
        ),
      },
      {
        key: 'actions',
        title: 'Actions',
        align: 'right',
        render: (inq) => (
          <div className="inline-flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedInquiry(inq)}
              className="h-7 px-2 text-[11px] bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Respond
            </Button>
            <button
              onClick={() => handleDeleteInquiry(inq.id)}
              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-md cursor-pointer"
              title="Delete Inquiry"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const volunteerColumns: DataTableColumn<VolunteerProfile>[] = useMemo(
    () => [
      {
        key: 'name',
        title: 'Volunteer & Badges',
        sortable: true,
        render: (v) => (
          <div>
            <div className="font-bold text-slate-900">{v.name}</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-mono font-bold text-rose-600 text-xs">{v.bloodGroup}</span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                {v.badge}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: 'role',
        title: 'Role & District',
        sortable: true,
        render: (v) => (
          <div>
            <div className="font-semibold text-slate-800">{v.role}</div>
            <div className="text-[11px] text-slate-500">
              {v.city}, {v.district}
            </div>
          </div>
        ),
      },
      {
        key: 'emergencyStandby',
        title: '24/7 Standby',
        sortable: true,
        render: (v) => (
          <button
            onClick={() => handleToggleVolunteerStandby(v.id, v.name)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
              v.emergencyStandby
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            {v.emergencyStandby ? 'Alert Active' : 'Standby Off'}
          </button>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        sortable: true,
        render: (v) => (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded ${
              v.status === 'Active'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : v.status === 'On Call'
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {v.status}
          </span>
        ),
      },
      {
        key: 'totalDrivesAttended',
        title: 'Field Activity',
        sortable: true,
        render: (v) => (
          <div className="text-xs text-slate-600">
            <span className="font-bold text-slate-900 tabular-nums">
              {v.totalDrivesAttended}
            </span>{' '}
            drives ·{' '}
            <span className="font-bold text-slate-900 tabular-nums">
              {v.totalDonations}
            </span>{' '}
            pints
          </div>
        ),
      },
      {
        key: 'mobile',
        title: 'Emergency Contact',
        render: (v) => (
          <div>
            <a
              href={`tel:${v.mobile}`}
              className="font-mono font-bold text-rose-600 hover:underline block text-xs"
            >
              {v.mobile}
            </a>
            {v.email && (
              <div className="text-[11px] text-slate-400 truncate max-w-[150px]">
                {v.email}
              </div>
            )}
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const teamColumns: DataTableColumn<TeamMember>[] = useMemo(
    () => [
      {
        key: 'name',
        title: 'Team Member',
        sortable: true,
        render: (m) => (
          <div className="flex items-center gap-3">
            <img
              src={m.image || '/img/logo.af0d533f.png'}
              alt={m.name}
              className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-2xs shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/img/logo.af0d533f.png';
              }}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 truncate">{m.name}</span>
                {m.isCore && (
                  <span className="text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.2 rounded">
                    Core
                  </span>
                )}
              </div>
              <div className="text-xs font-semibold text-rose-600">{m.role}</div>
            </div>
          </div>
        ),
      },
      {
        key: 'department',
        title: 'Department',
        sortable: true,
        render: (m) => (
          <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
            {m.department || 'Emergency Operations'}
          </span>
        ),
      },
      {
        key: 'bio',
        title: 'Bio Summary',
        render: (m) => (
          <p className="text-xs text-slate-600 line-clamp-2 max-w-sm italic">
            "{m.bio}"
          </p>
        ),
      },
      {
        key: 'contact',
        title: 'Direct Contact',
        render: (m) => (
          <div className="space-y-0.5 text-xs text-slate-600">
            {m.phone && (
              <div>
                <a
                  href={`tel:${m.phone}`}
                  className="font-mono text-rose-600 font-semibold hover:underline"
                >
                  {m.phone}
                </a>
              </div>
            )}
            {m.email && (
              <div className="text-slate-400 text-[11px] truncate max-w-[140px]">
                {m.email}
              </div>
            )}
          </div>
        ),
      },
      {
        key: 'actions',
        title: 'Actions',
        align: 'right',
        render: (m) => (
          <div className="inline-flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingTeamMember(m);
                setNewTeam({
                  name: m.name,
                  role: m.role,
                  bio: m.bio,
                  image: m.image,
                  department: m.department || 'Emergency Operations',
                  phone: m.phone || '',
                  email: m.email || '',
                  isCore: m.isCore,
                  socials: {
                    facebook: m.socials.facebook || '',
                    instagram: m.socials.instagram || '',
                    twitter: m.socials.twitter || '',
                  },
                });
                setShowTeamModal(true);
              }}
              className="h-7 px-2 text-[11px] bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <Edit className="w-3.5 h-3.5 mr-1" />
              <span>Edit</span>
            </Button>
            <button
              onClick={() => handleDeleteTeam(m.id, m.name)}
              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-md cursor-pointer"
              title="Remove member"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const donorColumns: DataTableColumn<BloodDonor>[] = useMemo(
    () => [
      {
        key: 'name',
        title: 'Donor Name & Age',
        sortable: true,
        sortValue: (d) => `${d.firstName} ${d.lastName}`,
        render: (d) => (
          <div>
            <div className="font-bold text-slate-900">
              {d.firstName} {d.lastName}
            </div>
            <div className="text-[11px] text-slate-500">
              {d.age}y · {d.gender}
            </div>
          </div>
        ),
      },
      {
        key: 'bloodGroup',
        title: 'Blood Group',
        sortable: true,
        render: (d) => (
          <span className="font-mono font-extrabold text-xs px-2.5 py-1 rounded bg-rose-50 text-rose-700 border border-rose-200">
            {d.bloodGroup}
          </span>
        ),
      },
      {
        key: 'location',
        title: 'Location',
        sortable: true,
        sortValue: (d) => `${d.city}, ${d.district}`,
        render: (d) => (
          <div>
            <div className="font-medium text-slate-800">{d.city}</div>
            <div className="text-[11px] text-slate-500">{d.district}</div>
          </div>
        ),
      },
      {
        key: 'mobile',
        title: 'Phone Contact',
        render: (d) => (
          <a
            href={`tel:${d.mobile}`}
            className="font-mono font-bold text-rose-600 hover:underline"
          >
            {d.mobile}
          </a>
        ),
      },
      {
        key: 'totalDonations',
        title: 'Donations',
        sortable: true,
        render: (d) => (
          <div className="text-xs text-slate-700">
            <span className="font-mono font-bold text-slate-900 tabular-nums">
              {d.totalDonations || 0}
            </span>{' '}
            pints
          </div>
        ),
      },
      {
        key: 'isAvailable',
        title: 'Availability',
        sortable: true,
        render: (d) => (
          <button
            onClick={() =>
              handleToggleAvailability(d.id, `${d.firstName} ${d.lastName}`)
            }
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
              d.isAvailable
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            {d.isAvailable ? 'Available' : 'Unavailable'}
          </button>
        ),
      },
      {
        key: 'actions',
        title: 'Action',
        align: 'right',
        render: (d) => (
          <a
            href={`tel:${d.mobile}`}
            className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white inline-flex items-center justify-center transition-colors"
            title="Call Donor"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const campaignColumns: DataTableColumn<Campaign>[] = useMemo(
    () => [
      {
        key: 'title',
        title: 'Camp & Organization',
        sortable: true,
        render: (camp) => (
          <div className="flex items-center gap-3">
            <img
              src={camp.bannerImage}
              alt={camp.title}
              className="w-12 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  '/img/overview.36cb952a.jpg';
              }}
            />
            <div className="min-w-0">
              <div className="font-bold text-slate-900 truncate max-w-xs">
                {camp.title}
              </div>
              <div className="text-[11px] text-slate-500">{camp.organizerName}</div>
            </div>
          </div>
        ),
      },
      {
        key: 'date',
        title: 'Date & Schedule',
        sortable: true,
        render: (camp) => (
          <div className="flex items-center gap-1.5 text-xs text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span className="font-medium">{camp.date}</span>
          </div>
        ),
      },
      {
        key: 'location',
        title: 'Venue & District',
        sortable: true,
        sortValue: (c) => `${c.venue}, ${c.district}`,
        render: (camp) => (
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              {camp.venue}, {camp.district}
            </span>
          </div>
        ),
      },
      {
        key: 'attendance',
        title: 'Collection',
        sortable: true,
        sortValue: (c) => Number(c.unitsCollected || c.attendance) || 0,
        render: (camp) => (
          <div className="text-xs text-slate-700">
            <span className="font-mono font-bold text-rose-600 tabular-nums">
              {camp.unitsCollected || camp.attendance}
            </span>{' '}
            units
          </div>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        sortable: true,
        render: (camp) => (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded ${
              camp.status === 'Active'
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : camp.status === 'Completed'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {camp.status}
          </span>
        ),
      },
      {
        key: 'actions',
        title: 'Details',
        align: 'right',
        render: (camp) => (
          <Link to={`/campaign/${camp.slug}`}>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7 px-2.5 bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              View Camp
            </Button>
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans antialiased overflow-hidden selection:bg-rose-500 selection:text-white">
      <SEO
        title="Admin Command Center | Nepal Health Sewa"
        description="Dedicated operations dashboard for emergency medical triage, citizen enquiries, field volunteer coordination, and leadership management."
        keywords="operations dashboard, hospital triage Nepal, blood bank admin, volunteer management"
      />

      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR MENU (Admin Shell) */}
      {/* ========================================================================= */}
      {/* Mobile Backdrop */}
      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setSidebarMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0 select-none ${
          sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${sidebarCollapsed ? 'lg:w-20 w-72' : 'w-72'}`}
      >
        {/* Brand Header */}
        <div
          className={`p-4 border-b border-slate-200/80 flex items-center ${
            sidebarCollapsed ? 'lg:justify-center justify-between' : 'justify-between'
          }`}
        >
          <div className={`flex items-center gap-3 overflow-hidden ${sidebarCollapsed ? 'lg:justify-center' : ''}`}>
            <img
              src="/img/logo.af0d533f.png"
              alt="Nepal Health Sewa Logo"
              className="w-9 h-9 object-contain shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/img/logo.339ea3d3.jpg';
              }}
            />
            <div className={`${sidebarCollapsed ? 'lg:hidden' : 'block'} min-w-0`}>
              <div className="font-extrabold text-slate-900 text-sm tracking-tight leading-tight truncate">
                Nepal Health Sewa
              </div>
              <div className="text-[11px] font-semibold text-slate-400 mt-0.5 truncate">
                Operations & Dispatch Desk
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop collapse button inside sidebar header when expanded */}
            <button
              onClick={toggleSidebar}
              className={`hidden lg:flex p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer ${
                sidebarCollapsed ? 'hidden' : 'flex'
              }`}
              title="Collapse Sidebar (Ctrl+B)"
              aria-label="Collapse Sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
            {/* Mobile Close Button */}
            <button
              onClick={() => setSidebarMobileOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close Mobile Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-6">
          <div>
            <div
              className={`px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 ${
                sidebarCollapsed ? 'lg:hidden' : 'block'
              }`}
            >
              Core Operations
            </div>
            {sidebarCollapsed && (
              <div className="hidden lg:block w-8 mx-auto my-2 border-t border-slate-200/80" />
            )}
            <nav className="space-y-1">
              {navMenuItems.slice(0, 3).map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarMobileOpen(false);
                    }}
                    title={sidebarCollapsed ? `${item.label}${item.badge !== undefined ? ` (${item.badge})` : ''}` : undefined}
                    className={`w-full flex items-center ${
                      sidebarCollapsed ? 'lg:justify-center lg:px-2 px-3 justify-between' : 'justify-between px-3'
                    } py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer relative group ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                      <span className={`truncate ${sidebarCollapsed ? 'lg:hidden' : 'inline'}`}>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                          item.badgeColor || 'bg-slate-100 text-slate-600'
                        } ${sidebarCollapsed ? 'lg:hidden' : 'inline'}`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {/* Collapsed Badge Dot Indicator */}
                    {item.badge !== undefined && sidebarCollapsed && (
                      <span className="hidden lg:block absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div>
            <div
              className={`px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 ${
                sidebarCollapsed ? 'lg:hidden' : 'block'
              }`}
            >
              Community & Field
            </div>
            {sidebarCollapsed && (
              <div className="hidden lg:block w-8 mx-auto my-2 border-t border-slate-200/80" />
            )}
            <nav className="space-y-1">
              {navMenuItems.slice(3).map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarMobileOpen(false);
                    }}
                    title={sidebarCollapsed ? `${item.label}${item.badge !== undefined ? ` (${item.badge})` : ''}` : undefined}
                    className={`w-full flex items-center ${
                      sidebarCollapsed ? 'lg:justify-center lg:px-2 px-3 justify-between' : 'justify-between px-3'
                    } py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer relative group ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                      <span className={`truncate ${sidebarCollapsed ? 'lg:hidden' : 'inline'}`}>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                          item.badgeColor || 'bg-slate-100 text-slate-600'
                        } ${sidebarCollapsed ? 'lg:hidden' : 'inline'}`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {/* Collapsed Badge Dot Indicator */}
                    {item.badge !== undefined && sidebarCollapsed && (
                      <span className="hidden lg:block absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer with Admin Profile & Public Site Exit */}
        <div className="p-3 border-t border-slate-200/80 space-y-2 bg-slate-50/80">
          <div
            className={`flex items-center ${
              sidebarCollapsed ? 'lg:justify-center p-1.5' : 'gap-3 p-2'
            } rounded-xl bg-white border border-slate-200 shadow-2xs`}
            title={sidebarCollapsed ? 'Duty Admin (Birgunj)' : undefined}
          >
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 font-bold flex items-center justify-center border border-rose-200 shrink-0 text-xs font-mono">
              SK
            </div>
            <div className={`min-w-0 flex-1 ${sidebarCollapsed ? 'lg:hidden' : 'block'}`}>
              <div className="text-[11px] text-emerald-700 font-semibold truncate">
                Duty Admin (Birgunj)
              </div>
            </div>
          </div>

          <Link
            to="/"
            title="Switch to Public Website"
            className={`w-full flex items-center ${
              sidebarCollapsed ? 'lg:justify-center px-2 py-2' : 'justify-center gap-2 py-2 px-3'
            } rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all border border-slate-200`}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span className={`${sidebarCollapsed ? 'lg:hidden' : 'inline'} truncate`}>Switch to Public Website</span>
          </Link>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. RIGHT-SIDE CONTAINER: TOP BAR + MAIN CONTENT */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
        {/* Top Professional Bar */}
        <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 sm:px-8 shrink-0 z-20">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Universal Sidebar Toggle Button (Desktop collapse or Mobile drawer) */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200 shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-rose-500/20"
              title={sidebarCollapsed ? 'Expand Sidebar (Ctrl+B)' : 'Collapse Sidebar (Ctrl+B)'}
              aria-label={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-slate-700" />
              ) : (
                <PanelLeftClose className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Breadcrumb info */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                <span>Operations</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-rose-600 font-bold uppercase tracking-wider capitalize">
                  {activeSection.replace('-', ' ')}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 font-display capitalize hidden sm:block">
                {activeSection === 'overview'
                  ? 'Real-Time Emergency Command Center'
                  : activeSection === 'emergency'
                  ? 'Active Emergency Triage Queue'
                  : activeSection === 'inquiries'
                  ? 'Hospital & Citizen Communications Desk'
                  : activeSection === 'volunteers'
                  ? 'Field Responders & Standby Network'
                  : activeSection === 'team'
                  ? 'Leadership & Coordinators Registry'
                  : activeSection === 'donors'
                  ? 'Verified Blood Donor Directory'
                  : 'Community Donation Camps Tracker'}
              </h2>
            </div>
          </div>

          {/* Right Action Icons & Clocks */}
          <div className="flex items-center gap-3">
            {/* Live Clock Nepal */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700">
              <Clock className="w-3.5 h-3.5 text-rose-600" />
              <span>NPT {currentTime || 'Loading...'}</span>
            </div>

            {/* Emergency Hotline Speed Dial */}
            <a
              href="tel:051521993"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-colors"
              title="Quick Dial Narayani Hospital Blood Bank"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
              <span>Hotline 051-521993</span>
            </a>

            {/* Export CSV button */}
            <Button
              variant="outline"
              size="sm"
              onClick={exportTicketsCSV}
              className="hidden sm:inline-flex text-xs h-8 px-2.5 bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              <span>Export CSV</span>
            </Button>

            {/* Top Quick Dispatch CTA */}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowTicketModal(true)}
              className="text-xs font-bold h-8 px-3 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>New Dispatch</span>
            </Button>
          </div>
        </header>

        {/* Main Content Area (Right Side) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 bg-slate-50 text-slate-900">
          <div key={activeSection} className="page-transition">
          {/* ========================================================================= */}
          {/* VIEW 1: OVERVIEW */}
          {/* ========================================================================= */}
          {activeSection === 'overview' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              {/* Top Row: Executive Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Active Emergency</span>
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 font-mono">{activeTickets}</div>
                  <div className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    <span>{urgentTickets} requiring 2h surgical intake</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Available Donors</span>
                    <Droplet className="w-4 h-4 text-red-500 fill-current" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 font-mono">
                    {availableDonors} <span className="text-sm font-sans font-normal text-slate-500">/ {totalDonors}</span>
                  </div>
                  <div className="text-[11px] font-medium text-emerald-400">
                    {availabilityRate}% ready to donate today
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Citizen Enquiries</span>
                    <MessageSquare className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 font-mono">{inquiries.length}</div>
                  <div className="text-[11px] font-medium text-sky-400">
                    {newInquiriesCount} new messages pending response
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Field Volunteers</span>
                    <UserCheck className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 font-mono">{activeVolunteersCount}</div>
                  <div className="text-[11px] font-medium text-purple-400">
                    {standbyVolunteersCount} active on 24/7 emergency standby
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Rare Rh-Negative</span>
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 font-mono">{rareDonorsCount}</div>
                  <div className="text-[11px] font-medium text-amber-400">
                    Verified O-, A-, B-, AB- network
                  </div>
                </div>
              </div>

              {/* Real-time ABO Stock Barometer */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-red-500 fill-current" />
                      <span>ABO & Rh Blood Stock Barometer</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Live status across Parsa, Bara, Kathmandu, and Chitwan voluntary donors.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveSection('donors')}
                    className="text-xs h-7 px-3 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 self-start sm:self-auto"
                  >
                    <span>View Donor Pool</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {bloodGroupStats.map((item) => (
                    <div
                      key={item.group}
                      className={`p-3.5 rounded-xl border text-center transition-all ${
                        item.status === 'Critical'
                          ? 'bg-rose-50 border-rose-200 text-rose-700'
                          : item.status === 'Low'
                          ? 'bg-amber-50 border-amber-200 text-amber-700'
                          : item.status === 'Moderate'
                          ? 'bg-sky-50 border-sky-200 text-sky-700'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      }`}
                    >
                      <div className="text-base font-extrabold font-mono text-white">{item.group}</div>
                      <div className="text-2xl font-bold font-mono mt-1">{item.available}</div>
                      <div className="text-[10px] opacity-75 mt-0.5">of {item.total} ready</div>
                      <div className="mt-2 text-[10px] font-bold uppercase tracking-wider">
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Split Feed: Active Emergencies & Inquiries */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Active Emergency Requests (7 cols) */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span>Live Hospital Triage Queue</span>
                    </h3>
                    <button
                      onClick={() => setActiveSection('emergency')}
                      className="text-xs font-semibold text-rose-600 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>All requests ({tickets.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tickets.slice(0, 4).map((ticket) => (
                      <div
                        key={ticket.id}
                        className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-slate-900">{ticket.ticketNumber}</span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                ticket.status === 'Pending'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : ticket.status === 'In Progress'
                                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                                  : ticket.status === 'Fulfilled'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}
                            >
                              {ticket.status}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600/30 text-red-300 border border-red-500/40">
                              {ticket.sewaType} {ticket.bloodGroup ? `(${ticket.bloodGroup})` : ''}
                            </span>
                          </div>

                          <div className="text-xs font-bold text-slate-800">
                            {ticket.patientName} ({ticket.patientAge}y) · {ticket.hospitalName}
                          </div>

                          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-slate-500" />
                            <span>Contact: {ticket.contactMobile} ({ticket.contactName})</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTicket(ticket)}
                            className="text-xs h-7 px-2.5 bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" />
                            <span>View</span>
                          </Button>

                          <a
                            href={`tel:${ticket.contactMobile}`}
                            className="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                            title="Call Patient Attendant"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Citizen Enquiries (5 cols) */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-sky-400" />
                      <span>Citizen & Hospital Enquiries</span>
                    </h3>
                    <button
                      onClick={() => setActiveSection('inquiries')}
                      className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>All enquiries ({inquiries.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {inquiries.slice(0, 4).map((inq) => (
                      <div
                        key={inq.id}
                        className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/70 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-slate-700">{inq.ticketId}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              inq.status === 'New'
                                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                                : inq.status === 'In Progress'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : inq.status === 'Resolved'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-900">{inq.name}</div>
                        <p className="text-[11px] text-slate-400 line-clamp-2">"{inq.message}"</p>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px] text-slate-500">
                          <span>{inq.category}</span>
                          <a href={`tel:${inq.mobile}`} className="text-rose-600 font-bold hover:underline">
                            {inq.mobile}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 2: EMERGENCY REQUESTS */}
          {/* ========================================================================= */}
          {activeSection === 'emergency' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span>24/7 Medical Emergency Triage Queue</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Live coordination for blood units, high-pressure oxygen, and basic/advanced ambulance dispatch.
                </p>
              </div>

              <DataTable<EmergencyTicket>
                data={filteredTickets}
                columns={emergencyColumns}
                keyExtractor={(t) => t.id}
                searchPlaceholder="Search patient, hospital, ticket..."
                searchValue={ticketSearch}
                onSearchChange={setTicketSearch}
                filters={[
                  {
                    id: 'status',
                    value: ticketStatusFilter,
                    onChange: setTicketStatusFilter,
                    options: [
                      { label: 'All Statuses', value: 'ALL' },
                      { label: 'Pending (Unassigned)', value: 'Pending' },
                      { label: 'In Progress (Mobilizing)', value: 'In Progress' },
                      { label: 'Fulfilled (Delivered)', value: 'Fulfilled' },
                      { label: 'Closed', value: 'Closed' },
                    ],
                  },
                  {
                    id: 'urgency',
                    value: ticketUrgencyFilter,
                    onChange: setTicketUrgencyFilter,
                    options: [
                      { label: 'All Urgencies', value: 'ALL' },
                      { label: 'Immediate (Within 2 hrs)', value: 'Immediate (Within 2 hrs)' },
                      { label: 'Today (Within 6 hrs)', value: 'Today (Within 6 hrs)' },
                      { label: 'Scheduled', value: 'Scheduled' },
                    ],
                  },
                  {
                    id: 'sewa',
                    value: ticketSewaFilter,
                    onChange: setTicketSewaFilter,
                    options: [
                      { label: 'All Services', value: 'ALL' },
                      { label: 'Blood Transfusion', value: 'Blood' },
                      { label: 'Oxygen Cylinder', value: 'Oxygen' },
                      { label: 'Ambulance Transit', value: 'Ambulance' },
                      { label: 'Hospital ICU Bed', value: 'Bed Availability' },
                      { label: 'Medicine Supply', value: 'Medicine' },
                    ],
                  },
                ]}
                actions={
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowTicketModal(true)}
                    className="text-xs font-bold shadow-xs"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    <span>New Emergency Dispatch</span>
                  </Button>
                }
                onResetFilters={() => {
                  setTicketStatusFilter('ALL');
                  setTicketUrgencyFilter('ALL');
                  setTicketSewaFilter('ALL');
                  setTicketSearch('');
                }}
                hasActiveFilters={
                  ticketStatusFilter !== 'ALL' ||
                  ticketUrgencyFilter !== 'ALL' ||
                  ticketSewaFilter !== 'ALL'
                }
                emptyTitle="No emergency tickets found"
                emptyDescription="No emergency dispatch tickets match your search filters."
                emptyActionText="New Emergency Dispatch"
                onEmptyAction={() => setShowTicketModal(true)}
                paginated={true}
                initialPageSize={10}
                pageSizeOptions={[5, 10, 20, 50]}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 3: CITIZEN ENQUIRIES */}
          {/* ========================================================================= */}
          {activeSection === 'inquiries' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-sky-500" />
                  <span>Citizen & Hospital Enquiries Desk</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Track partnership proposals, camp organization inquiries, donor eligibility questions, and citizen feedback.
                </p>
              </div>

              <DataTable<ContactInquiry>
                data={filteredInquiries}
                columns={inquiryColumns}
                keyExtractor={(inq) => inq.id}
                searchPlaceholder="Search citizen, phone, message..."
                searchValue={inquirySearch}
                onSearchChange={setInquirySearch}
                filters={[
                  {
                    id: 'status',
                    value: inquiryStatusFilter,
                    onChange: setInquiryStatusFilter,
                    options: [
                      { label: 'All Statuses', value: 'ALL' },
                      { label: 'New (Unresponded)', value: 'New' },
                      { label: 'In Progress', value: 'In Progress' },
                      { label: 'Resolved', value: 'Resolved' },
                      { label: 'Archived', value: 'Archived' },
                    ],
                  },
                  {
                    id: 'category',
                    value: inquiryCategoryFilter,
                    onChange: setInquiryCategoryFilter,
                    options: [
                      { label: 'All Categories', value: 'ALL' },
                      { label: 'Hospital Partnership', value: 'Hospital Partnership' },
                      { label: 'Camp Organization', value: 'Camp Organization' },
                      { label: 'Donor Inquiry', value: 'Donor Inquiry' },
                      { label: 'Emergency Assistance', value: 'Emergency Assistance' },
                      { label: 'General Feedback', value: 'General Feedback' },
                    ],
                  },
                ]}
                actions={
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowInquiryModal(true)}
                    className="text-xs font-bold"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    <span>Log Citizen Inquiry</span>
                  </Button>
                }
                onResetFilters={() => {
                  setInquiryStatusFilter('ALL');
                  setInquiryCategoryFilter('ALL');
                  setInquirySearch('');
                }}
                hasActiveFilters={
                  inquiryStatusFilter !== 'ALL' || inquiryCategoryFilter !== 'ALL'
                }
                emptyTitle="No citizen inquiries found"
                emptyDescription="No customer or partner inquiries match your current filters."
                emptyActionText="Log Citizen Inquiry"
                onEmptyAction={() => setShowInquiryModal(true)}
                paginated={true}
                initialPageSize={10}
                pageSizeOptions={[5, 10, 20, 50]}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 4: VOLUNTEERS */}
          {/* ========================================================================= */}
          {activeSection === 'volunteers' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-500" />
                  <span>Field Volunteers & Community Responders</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Manage youth responders, emergency cold-chain escorts, and hospital liaison coordinators across Nepal.
                </p>
              </div>

              <DataTable<VolunteerProfile>
                data={filteredVolunteers}
                columns={volunteerColumns}
                keyExtractor={(v) => v.id}
                searchPlaceholder="Search volunteer, role, city..."
                searchValue={volunteerSearch}
                onSearchChange={setVolunteerSearch}
                filters={[
                  {
                    id: 'district',
                    value: volunteerDistrictFilter,
                    onChange: setVolunteerDistrictFilter,
                    options: [
                      { label: 'All Districts', value: 'ALL' },
                      ...DISTRICTS_NEPAL.map((d) => ({ label: d, value: d })),
                    ],
                  },
                  {
                    id: 'status',
                    value: volunteerStatusFilter,
                    onChange: setVolunteerStatusFilter,
                    options: [
                      { label: 'All Statuses', value: 'ALL' },
                      { label: 'Active', value: 'Active' },
                      { label: 'On Call', value: 'On Call' },
                      { label: 'Inactive', value: 'Inactive' },
                    ],
                  },
                ]}
                customFilters={
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                    <input
                      type="checkbox"
                      checked={volunteerStandbyOnly}
                      onChange={(e) => setVolunteerStandbyOnly(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
                    />
                    <span>24/7 Standby Only</span>
                  </label>
                }
                actions={
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowVolunteerModal(true)}
                    className="text-xs font-bold"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    <span>Register Volunteer</span>
                  </Button>
                }
                onResetFilters={() => {
                  setVolunteerDistrictFilter('ALL');
                  setVolunteerStatusFilter('ALL');
                  setVolunteerStandbyOnly(false);
                  setVolunteerSearch('');
                }}
                hasActiveFilters={
                  volunteerDistrictFilter !== 'ALL' ||
                  volunteerStatusFilter !== 'ALL' ||
                  volunteerStandbyOnly
                }
                emptyTitle="No volunteers found"
                emptyDescription="No field volunteers match your search and filter criteria."
                emptyActionText="Register Volunteer"
                onEmptyAction={() => setShowVolunteerModal(true)}
                paginated={true}
                initialPageSize={10}
                pageSizeOptions={[5, 10, 20, 50]}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 5: TEAM MANAGEMENT */}
          {/* ========================================================================= */}
          {activeSection === 'team' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-500" />
                  <span>Leadership & Operational Team Registry</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Manage organization founders, executive leads, coordinators, and medical advisors of Nepal Health Sewa.
                </p>
              </div>

              <DataTable<TeamMember>
                data={filteredTeam}
                columns={teamColumns}
                keyExtractor={(m) => m.id}
                searchPlaceholder="Search name, role, bio..."
                searchValue={teamSearch}
                onSearchChange={setTeamSearch}
                filters={[
                  {
                    id: 'department',
                    value: teamDepartmentFilter,
                    onChange: setTeamDepartmentFilter,
                    options: [
                      { label: 'All Departments', value: 'ALL' },
                      { label: 'Leadership', value: 'Leadership' },
                      { label: 'Emergency Operations', value: 'Emergency Operations' },
                      { label: 'Donor Relations', value: 'Donor Relations' },
                      { label: 'Logistics', value: 'Logistics' },
                      { label: 'Medical Advisory', value: 'Medical Advisory' },
                      { label: 'Youth Wing', value: 'Youth Wing' },
                    ],
                  },
                ]}
                actions={
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setEditingTeamMember(null);
                      setShowTeamModal(true);
                    }}
                    className="text-xs font-bold"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    <span>Add Team Member</span>
                  </Button>
                }
                onResetFilters={() => {
                  setTeamDepartmentFilter('ALL');
                  setTeamSearch('');
                }}
                hasActiveFilters={teamDepartmentFilter !== 'ALL'}
                emptyTitle="No team members found"
                emptyDescription="No team members match your current filters."
                emptyActionText="Add Team Member"
                onEmptyAction={() => {
                  setEditingTeamMember(null);
                  setShowTeamModal(true);
                }}
                paginated={true}
                initialPageSize={10}
                pageSizeOptions={[5, 10, 20]}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 6: BLOOD DONORS */}
          {/* ========================================================================= */}
          {activeSection === 'donors' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-red-500 fill-current" />
                  <span>Voluntary Blood Donor Pool</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Live verified registry of voluntary whole blood, plasma, and platelet donors across Nepal.
                </p>
              </div>

              <DataTable<BloodDonor>
                data={filteredDonors}
                columns={donorColumns}
                keyExtractor={(d) => d.id}
                searchPlaceholder="Search donor name, phone, city..."
                searchValue={donorSearch}
                onSearchChange={setDonorSearch}
                filters={[
                  {
                    id: 'bloodGroup',
                    value: donorGroupFilter,
                    onChange: setDonorGroupFilter,
                    options: [
                      { label: 'All Blood Groups', value: 'ALL' },
                      ...BLOOD_GROUPS.map((g) => ({ label: g, value: g })),
                    ],
                  },
                  {
                    id: 'district',
                    value: donorDistrictFilter,
                    onChange: setDonorDistrictFilter,
                    options: [
                      { label: 'All Districts', value: 'ALL' },
                      ...DISTRICTS_NEPAL.map((d) => ({ label: d, value: d })),
                    ],
                  },
                ]}
                customFilters={
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                    <input
                      type="checkbox"
                      checked={donorAvailableOnly}
                      onChange={(e) => setDonorAvailableOnly(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
                    />
                    <span>Available Donors Only</span>
                  </label>
                }
                actions={
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowDonorModal(true)}
                    className="text-xs font-bold"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    <span>Register Voluntary Donor</span>
                  </Button>
                }
                onResetFilters={() => {
                  setDonorGroupFilter('ALL');
                  setDonorDistrictFilter('ALL');
                  setDonorAvailableOnly(false);
                  setDonorSearch('');
                }}
                hasActiveFilters={
                  donorGroupFilter !== 'ALL' ||
                  donorDistrictFilter !== 'ALL' ||
                  donorAvailableOnly
                }
                emptyTitle="No donors found"
                emptyDescription="No voluntary blood donors match your search or filter requirements."
                emptyActionText="Register Voluntary Donor"
                onEmptyAction={() => setShowDonorModal(true)}
                paginated={true}
                initialPageSize={10}
                pageSizeOptions={[5, 10, 20, 50]}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 7: CAMPS & DRIVES */}
          {/* ========================================================================= */}
          {activeSection === 'campaigns' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  <span>Community Blood Drives & Mobile Camps</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Track mobile collection drives across Parsa, Bara, Janakpur, and Chitwan.
                </p>
              </div>

              <DataTable<Campaign>
                data={campaigns}
                columns={campaignColumns}
                keyExtractor={(camp) => camp.id}
                searchPlaceholder="Search camp title, organizer, district..."
                emptyTitle="No camps found"
                emptyDescription="No donation drives currently match your query."
                paginated={true}
                initialPageSize={10}
                pageSizeOptions={[5, 10, 20]}
              />
            </div>
          )}


          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: NEW EMERGENCY TICKET MODAL */}
      {/* ========================================================================= */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative my-8 text-slate-900">
            <button
              onClick={() => setShowTicketModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>24/7 Operations Desk</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Dispatch Emergency Request</h3>
              <p className="text-xs text-slate-400">
                Log critical medical requests for immediate volunteer mobilization.
              </p>
            </div>

            <form onSubmit={handleCreateTicketSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Service Type *</label>
                  <select
                    value={newTicket.sewaType}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, sewaType: e.target.value as EmergencyServiceType })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  >
                    <option value="Blood">Blood Transfusion</option>
                    <option value="Oxygen">Oxygen Cylinder</option>
                    <option value="Ambulance">Ambulance Transit</option>
                    <option value="Bed Availability">Hospital ICU Bed</option>
                    <option value="Medicine">Medicine Supply</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Urgency Priority *</label>
                  <select
                    value={newTicket.urgency}
                    onChange={(e) =>
                      setNewTicket({
                        ...newTicket,
                        urgency: e.target.value as 'Immediate (Within 2 hrs)' | 'Today (Within 6 hrs)' | 'Scheduled',
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  >
                    <option value="Immediate (Within 2 hrs)">Immediate (Within 2 hrs)</option>
                    <option value="Today (Within 6 hrs)">Today (Within 6 hrs)</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
              </div>

              {newTicket.sewaType === 'Blood' && (
                <div className="grid grid-cols-2 gap-3 p-3 bg-rose-50/80 rounded-xl border border-rose-200/80">
                  <div>
                    <label className="block text-xs font-semibold text-rose-950 mb-1">Blood Group *</label>
                    <select
                      value={newTicket.bloodGroup}
                      onChange={(e) =>
                        setNewTicket({ ...newTicket, bloodGroup: e.target.value as BloodGroup })
                      }
                      className="w-full px-3 py-2 text-xs bg-white border border-rose-300 rounded-lg font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                    >
                      {BLOOD_GROUPS.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-rose-950 mb-1">Units / Pints *</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={newTicket.unitsNeeded}
                      onChange={(e) => setNewTicket({ ...newTicket, unitsNeeded: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs bg-white border border-rose-300 rounded-lg font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Patient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Shrestha"
                    value={newTicket.patientName}
                    onChange={(e) => setNewTicket({ ...newTicket, patientName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Age *</label>
                  <input
                    type="number"
                    required
                    value={newTicket.patientAge}
                    onChange={(e) => setNewTicket({ ...newTicket, patientAge: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Hospital / Clinic *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Narayani Hospital, ICU Ward 3"
                    value={newTicket.hospitalName}
                    onChange={(e) => setNewTicket({ ...newTicket, hospitalName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Contact Phone (10 digits) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9845012345"
                    value={newTicket.contactMobile}
                    onChange={(e) => setNewTicket({ ...newTicket, contactMobile: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Clinical Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Doctor's name, surgery schedule, specific requirements..."
                  value={newTicket.message}
                  onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowTicketModal(false)} className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                  Cancel
                </Button>
                <Button variant="destructive" size="sm" type="submit" isLoading={isCreatingTicket}>
                  Dispatch Ticket
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: TICKET DETAILS MODAL */}
      {/* ========================================================================= */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative text-slate-900">
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-slate-900">{selectedTicket.ticketNumber}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-600/30 text-red-300 border border-red-500/40">
                  {selectedTicket.sewaType}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedTicket.patientName}</h3>
              <div className="text-xs text-slate-400">
                {selectedTicket.patientAge} years · {selectedTicket.gender} · Admitted at {selectedTicket.hospitalName}
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200/80">
                <span className="text-slate-400">Hospital Address:</span>
                <span className="font-semibold text-white">{selectedTicket.hospitalAddress}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/80">
                <span className="text-slate-400">Emergency Contact:</span>
                <span className="font-semibold text-white">
                  {selectedTicket.contactName} ({selectedTicket.contactMobile})
                </span>
              </div>
              {selectedTicket.bloodGroup && (
                <div className="flex justify-between py-1 border-b border-slate-200/80">
                  <span className="text-slate-400">Blood Requisition:</span>
                  <span className="font-bold text-rose-600 font-mono">
                    {selectedTicket.unitsNeeded || 1} Pint(s) of {selectedTicket.bloodGroup}
                  </span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-slate-200/80">
                <span className="text-slate-400">Urgency Level:</span>
                <span className="font-bold text-rose-600">{selectedTicket.urgency}</span>
              </div>
              {selectedTicket.message && (
                <div className="pt-1">
                  <span className="text-slate-400 block mb-1">Clinical Note:</span>
                  <p className="text-slate-300 italic">"{selectedTicket.message}"</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`tel:${selectedTicket.contactMobile}`}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-red-700 transition-colors shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {selectedTicket.contactMobile}</span>
              </a>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTicket(null)}
                className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: LOG INQUIRY MODAL */}
      {/* ========================================================================= */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl relative text-slate-900">
            <button
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span>Citizen Communications</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Log New Inquiry</h3>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Citizen / Hospital Rep Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rabin Shrestha"
                  value={newInquiry.name}
                  onChange={(e) => setNewInquiry({ ...newInquiry, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9845012345"
                    value={newInquiry.mobile}
                    onChange={(e) => setNewInquiry({ ...newInquiry, mobile: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Category *</label>
                  <select
                    value={newInquiry.category}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, category: e.target.value as InquiryCategory })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg font-semibold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  >
                    <option value="Hospital Partnership">Hospital Partnership</option>
                    <option value="Camp Organization">Camp Organization</option>
                    <option value="Donor Inquiry">Donor Inquiry</option>
                    <option value="Emergency Assistance">Emergency Assistance</option>
                    <option value="General Feedback">General Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Inquiry Notes *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summary of request, question, or phone discussion..."
                  value={newInquiry.message}
                  onChange={(e) => setNewInquiry({ ...newInquiry, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowInquiryModal(false)} className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" isLoading={isSubmittingInquiry}>
                  Record Inquiry
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: INQUIRY DETAILS / RESPOND MODAL */}
      {/* ========================================================================= */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-slate-900">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-bold text-sky-700 uppercase tracking-wider">{selectedInquiry.ticketId}</div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedInquiry.name}</h3>
              <div className="text-xs text-slate-400">Phone: {selectedInquiry.mobile} · {selectedInquiry.category}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              "{selectedInquiry.message}"
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-600">Add Coordinator Response Note</label>
              <textarea
                rows={2}
                placeholder="Called citizen, coordinated with blood bank..."
                defaultValue={selectedInquiry.responseNotes || ''}
                id="responseNoteInput"
                className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`tel:${selectedInquiry.mobile}`}
                className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Citizen</span>
              </a>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const el = document.getElementById('responseNoteInput') as HTMLTextAreaElement;
                    handleUpdateInquiryStatus(selectedInquiry.id, 'Resolved', el?.value || '');
                    setSelectedInquiry(null);
                  }}
                >
                  Mark Resolved
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: REGISTER VOLUNTEER MODAL */}
      {/* ========================================================================= */}
      {showVolunteerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative text-slate-900">
            <button
              onClick={() => setShowVolunteerModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                <UserCheck className="w-4 h-4" />
                <span>Community Force</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Register New Volunteer</h3>
            </div>

            <form onSubmit={handleVolunteerSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Giri"
                    value={newVolunteer.name}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Volunteer Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Field Responder"
                    value={newVolunteer.role}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">District *</label>
                  <select
                    value={newVolunteer.district}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, district: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  >
                    {DISTRICTS_NEPAL.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={newVolunteer.city}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Blood Group *</label>
                  <select
                    value={newVolunteer.bloodGroup}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, bloodGroup: e.target.value as BloodGroup })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  >
                    {BLOOD_GROUPS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Mobile (10 digits) *</label>
                  <input
                    type="tel"
                    required
                    value={newVolunteer.mobile}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, mobile: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Recognition Badge</label>
                  <select
                    value={newVolunteer.badge}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, badge: e.target.value as VolunteerBadge })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg font-semibold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  >
                    <option value="Youth Lead">Youth Lead</option>
                    <option value="Gold Responder">Gold Responder</option>
                    <option value="Field Medic">Field Medic</option>
                    <option value="Star Donor">Star Donor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Key Skills (comma separated)</label>
                <input
                  type="text"
                  placeholder="Cold Chain Transport, Hospital Liaison, First Aid..."
                  value={newVolunteer.skills}
                  onChange={(e) => setNewVolunteer({ ...newVolunteer, skills: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newVolunteer.emergencyStandby}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, emergencyStandby: e.target.checked })}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span>Activate 24/7 Emergency Standby status immediately</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowVolunteerModal(false)} className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" isLoading={isAddingVolunteer}>
                  Add Volunteer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: ADD / EDIT TEAM MEMBER MODAL */}
      {/* ========================================================================= */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative text-slate-900">
            <button
              onClick={() => {
                setShowTeamModal(false);
                setEditingTeamMember(null);
              }}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span>Executive Registry</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {editingTeamMember ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>
            </div>

            <form onSubmit={handleTeamSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayub Alam"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Official Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Operations Lead"
                    value={newTeam.role}
                    onChange={(e) => setNewTeam({ ...newTeam, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Department *</label>
                  <select
                    value={newTeam.department}
                    onChange={(e) =>
                      setNewTeam({ ...newTeam, department: e.target.value as TeamMember['department'] })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg font-semibold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  >
                    <option value="Leadership">Leadership</option>
                    <option value="Emergency Operations">Emergency Operations</option>
                    <option value="Donor Relations">Donor Relations</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Medical Advisory">Medical Advisory</option>
                    <option value="Youth Wing">Youth Wing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9845012345"
                    value={newTeam.phone}
                    onChange={(e) => setNewTeam({ ...newTeam, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Bio / Mission Statement</label>
                <textarea
                  rows={2}
                  placeholder="Helping others without expecting anything in return..."
                  value={newTeam.bio}
                  onChange={(e) => setNewTeam({ ...newTeam, bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newTeam.isCore}
                    onChange={(e) => setNewTeam({ ...newTeam, isCore: e.target.checked })}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span>Member of Core Executive Committee</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => {
                    setShowTeamModal(false);
                    setEditingTeamMember(null);
                  }}
                  className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" isLoading={isAddingTeam}>
                  {editingTeamMember ? 'Save Changes' : 'Add Member'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 7: REGISTER DONOR MODAL */}
      {/* ========================================================================= */}
      {showDonorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative text-slate-900">
            <button
              onClick={() => setShowDonorModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1">
                <Droplet className="w-4 h-4 fill-current" />
                <span>Voluntary Blood Network</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Register Voluntary Blood Donor</h3>
            </div>

            <form onSubmit={handleDonorSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={newDonor.firstName}
                    onChange={(e) => setNewDonor({ ...newDonor, firstName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={newDonor.lastName}
                    onChange={(e) => setNewDonor({ ...newDonor, lastName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Blood Group *</label>
                  <select
                    value={newDonor.bloodGroup}
                    onChange={(e) => setNewDonor({ ...newDonor, bloodGroup: e.target.value as BloodGroup })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  >
                    {BLOOD_GROUPS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Gender *</label>
                  <select
                    value={newDonor.gender}
                    onChange={(e) => setNewDonor({ ...newDonor, gender: e.target.value as Gender })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Age *</label>
                  <input
                    type="number"
                    min={18}
                    max={65}
                    value={newDonor.age}
                    onChange={(e) => setNewDonor({ ...newDonor, age: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">District *</label>
                  <select
                    value={newDonor.district}
                    onChange={(e) => setNewDonor({ ...newDonor, district: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  >
                    {DISTRICTS_NEPAL.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">City / Municipality *</label>
                  <input
                    type="text"
                    required
                    value={newDonor.city}
                    onChange={(e) => setNewDonor({ ...newDonor, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 font-semibold mb-1">Mobile Phone (10 digits) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9845012345"
                  value={newDonor.mobile}
                  onChange={(e) => setNewDonor({ ...newDonor, mobile: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowDonorModal(false)} className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" isLoading={isAddingDonor}>
                  Save Donor
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
