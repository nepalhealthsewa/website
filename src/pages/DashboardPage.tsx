import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Droplet,
  AlertTriangle,
  Calendar,
  Search,
  Plus,
  Phone,
  MapPin,
  Clock,
  FileSpreadsheet,
  Building2,
  ShieldCheck,
  ChevronRight,
  MessageSquare,
  UserCheck,
  Briefcase,
  Mail,
  Edit,
  Trash2,
  X,
  PhoneCall,
  Radio,
  Eye,
  Menu,
  ArrowLeft,
  Settings,
  Database,
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
import {
  BloodGroup,
  Gender,
  EmergencyTicket,
  ContactInquiry,
  TeamMember,
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
  | 'campaigns'
  | 'blood-banks'
  | 'settings';

const BLOOD_GROUPS: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
const DISTRICTS_NEPAL = ['Parsa', 'Bara', 'Kathmandu', 'Chitwan', 'Dhanusha', 'Morang', 'Rautahat', 'Makwanpur'];

export const DashboardPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

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
    { id: 'blood-banks', label: 'Regional Centers', icon: Building2 },
    { id: 'settings', label: 'System & Exports', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden selection:bg-red-500 selection:text-white">
      <SEO
        title="Admin Command Center | Nepal Health Sewa"
        description="Dedicated operations dashboard for emergency medical triage, citizen enquiries, field volunteer coordination, and leadership management."
        keywords="operations dashboard, hospital triage Nepal, blood bank admin, volunteer management"
      />

      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR MENU (Admin Shell) */}
      {/* ========================================================================= */}
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/img/logo.af0d533f.png"
              alt="Nepal Health Sewa Logo"
              className="w-9 h-9 object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/img/logo.339ea3d3.jpg';
              }}
            />
            <div>
              <div className="font-extrabold text-white text-sm tracking-tight leading-tight flex items-center gap-1.5">
                <span>Nepal Health Sewa</span>
              </div>
              <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>Command Center v2.5</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-6">
          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Core Operations
            </div>
            <nav className="space-y-1">
              {navMenuItems.slice(0, 3).map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-red-600 text-white shadow-md shadow-red-950/40 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                          item.badgeColor || 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Community & Field
            </div>
            <nav className="space-y-1">
              {navMenuItems.slice(3, 7).map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-red-600 text-white shadow-md shadow-red-950/40 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                          item.badgeColor || 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div>
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Administration & System
            </div>
            <nav className="space-y-1">
              {navMenuItems.slice(7).map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-red-600 text-white shadow-md shadow-red-950/40 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer with Admin Profile & Public Site Exit */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-900/90">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="w-8 h-8 rounded-full bg-red-600/30 text-red-400 font-bold flex items-center justify-center border border-red-500/50 shrink-0 text-xs font-mono">
              SK
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate">Sangam Kumar Pandit</div>
              <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Duty Admin (Birgunj)</span>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-red-400" />
            <span>Switch to Public Website</span>
          </Link>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. RIGHT-SIDE CONTAINER: TOP BAR + MAIN CONTENT */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-950">
        {/* Top Professional Bar */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 sm:px-8 shrink-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Open Sidebar Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb info */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                <span>Operations</span>
                <ChevronRight className="w-3 h-3 text-slate-600" />
                <span className="text-red-400 font-bold uppercase tracking-wider capitalize">
                  {activeSection.replace('-', ' ')}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-white capitalize hidden sm:block">
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
                  : activeSection === 'campaigns'
                  ? 'Community Donation Camps Tracker'
                  : activeSection === 'blood-banks'
                  ? 'Certified Blood Centers Directory'
                  : 'System Configuration & Data Export'}
              </h2>
            </div>
          </div>

          {/* Right Action Icons & Clocks */}
          <div className="flex items-center gap-3">
            {/* Live Clock Nepal */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-mono font-bold text-slate-300">
              <Clock className="w-3.5 h-3.5 text-red-400" />
              <span>NPT {currentTime || 'Loading...'}</span>
            </div>

            {/* Emergency Hotline Speed Dial */}
            <a
              href="tel:051521993"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 border border-red-500/40 text-red-300 hover:bg-red-600/30 text-xs font-bold transition-colors"
              title="Quick Dial Narayani Hospital Blood Bank"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-400" />
              <span>Hotline 051-521993</span>
            </a>

            {/* Export CSV button */}
            <Button
              variant="outline"
              size="sm"
              onClick={exportTicketsCSV}
              className="hidden sm:inline-flex text-xs h-8 px-2.5 bg-slate-800 border-slate-700 text-slate-200 hover:text-white"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              <span>Export CSV</span>
            </Button>

            {/* Top Quick Dispatch CTA */}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowTicketModal(true)}
              className="text-xs font-bold h-8 px-3 shadow-md shadow-red-950/50"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>New Dispatch</span>
            </Button>
          </div>
        </header>

        {/* Main Content Area (Right Side) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 bg-slate-950 text-slate-100">
          {/* ========================================================================= */}
          {/* VIEW 1: OVERVIEW */}
          {/* ========================================================================= */}
          {activeSection === 'overview' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              {/* Top Row: Executive Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Active Emergency</span>
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-3xl font-extrabold text-white font-mono">{activeTickets}</div>
                  <div className="text-[11px] font-bold text-red-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    <span>{urgentTickets} requiring 2h surgical intake</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Available Donors</span>
                    <Droplet className="w-4 h-4 text-red-500 fill-current" />
                  </div>
                  <div className="text-3xl font-extrabold text-white font-mono">
                    {availableDonors} <span className="text-sm font-sans font-normal text-slate-500">/ {totalDonors}</span>
                  </div>
                  <div className="text-[11px] font-medium text-emerald-400">
                    {availabilityRate}% ready to donate today
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Citizen Enquiries</span>
                    <MessageSquare className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white font-mono">{inquiries.length}</div>
                  <div className="text-[11px] font-medium text-sky-400">
                    {newInquiriesCount} new messages pending response
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Field Volunteers</span>
                    <UserCheck className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white font-mono">{activeVolunteersCount}</div>
                  <div className="text-[11px] font-medium text-purple-400">
                    {standbyVolunteersCount} active on 24/7 emergency standby
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Rare Rh-Negative</span>
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white font-mono">{rareDonorsCount}</div>
                  <div className="text-[11px] font-medium text-amber-400">
                    Verified O-, A-, B-, AB- network
                  </div>
                </div>
              </div>

              {/* Real-time ABO Stock Barometer */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
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
                    className="text-xs h-7 px-3 bg-slate-800 border-slate-700 text-slate-200 self-start sm:self-auto"
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
                          ? 'bg-rose-950/40 border-rose-800/80 text-rose-300'
                          : item.status === 'Low'
                          ? 'bg-amber-950/40 border-amber-800/80 text-amber-300'
                          : item.status === 'Moderate'
                          ? 'bg-sky-950/40 border-sky-800/80 text-sky-300'
                          : 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
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
                <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span>Live Hospital Triage Queue</span>
                    </h3>
                    <button
                      onClick={() => setActiveSection('emergency')}
                      className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>All requests ({tickets.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tickets.slice(0, 4).map((ticket) => (
                      <div
                        key={ticket.id}
                        className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-white">{ticket.ticketNumber}</span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                ticket.status === 'Pending'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : ticket.status === 'In Progress'
                                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                                  : ticket.status === 'Fulfilled'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {ticket.status}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600/30 text-red-300 border border-red-500/40">
                              {ticket.sewaType} {ticket.bloodGroup ? `(${ticket.bloodGroup})` : ''}
                            </span>
                          </div>

                          <div className="text-xs font-bold text-slate-200">
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
                            className="text-xs h-7 px-2.5 bg-slate-800 border-slate-700 text-slate-200"
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
                <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
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
                        className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-slate-300">{inq.ticketId}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              inq.status === 'New'
                                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                                : inq.status === 'In Progress'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : inq.status === 'Resolved'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-white">{inq.name}</div>
                        <p className="text-[11px] text-slate-400 line-clamp-2">"{inq.message}"</p>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[10px] text-slate-500">
                          <span>{inq.category}</span>
                          <a href={`tel:${inq.mobile}`} className="text-red-400 font-bold hover:underline">
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <span>24/7 Medical Emergency Triage Queue</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Live coordination for blood units, high-pressure oxygen, and basic/advanced ambulance dispatch.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowTicketModal(true)}
                    className="text-xs font-bold"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    <span>New Emergency Dispatch</span>
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search patient, hospital, ticket..."
                    value={ticketSearch}
                    onChange={(e) => setTicketSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:border-red-500"
                  />
                </div>

                <select
                  value={ticketStatusFilter}
                  onChange={(e) => setTicketStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white font-medium"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Pending">Pending (Unassigned)</option>
                  <option value="In Progress">In Progress (Mobilizing)</option>
                  <option value="Fulfilled">Fulfilled (Delivered)</option>
                  <option value="Closed">Closed</option>
                </select>

                <select
                  value={ticketUrgencyFilter}
                  onChange={(e) => setTicketUrgencyFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white font-medium"
                >
                  <option value="ALL">All Urgencies</option>
                  <option value="Immediate (Within 2 hrs)">Immediate (Within 2 hrs)</option>
                  <option value="Today (Within 6 hrs)">Today (Within 6 hrs)</option>
                  <option value="Scheduled">Scheduled Procedure</option>
                </select>

                <select
                  value={ticketSewaFilter}
                  onChange={(e) => setTicketSewaFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white font-medium"
                >
                  <option value="ALL">All Services</option>
                  <option value="Blood">Blood Transfusion</option>
                  <option value="Oxygen">Oxygen Cylinder</option>
                  <option value="Ambulance">Ambulance Transit</option>
                  <option value="Bed Availability">Hospital ICU Bed</option>
                  <option value="Medicine">Medicine Supply</option>
                </select>
              </div>

              {/* Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
                      <tr>
                        <th className="py-3.5 px-4">Ticket & Service</th>
                        <th className="py-3.5 px-4">Patient & Age</th>
                        <th className="py-3.5 px-4">Hospital & Location</th>
                        <th className="py-3.5 px-4">Urgency</th>
                        <th className="py-3.5 px-4">Contact Person</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredTickets.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-500">
                            No emergency tickets match your search filters.
                          </td>
                        </tr>
                      ) : (
                        filteredTickets.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-mono font-bold text-white">{t.ticketNumber}</div>
                              <div className="text-[10px] font-bold text-red-400 mt-0.5">
                                {t.sewaType} {t.bloodGroup ? `(${t.bloodGroup})` : ''}
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-200">{t.patientName}</div>
                              <div className="text-[11px] text-slate-400">{t.patientAge}y · {t.gender}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-medium text-slate-200">{t.hospitalName}</div>
                              <div className="text-[11px] text-slate-500">{t.hospitalAddress}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                  t.urgency.startsWith('Immediate')
                                    ? 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse'
                                    : t.urgency.startsWith('Today')
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {t.urgency}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-medium text-slate-200">{t.contactName}</div>
                              <a href={`tel:${t.contactMobile}`} className="font-mono font-bold text-red-400 hover:underline">
                                {t.contactMobile}
                              </a>
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={t.status}
                                onChange={(e) =>
                                  handleUpdateStatus(t.id, e.target.value as EmergencyTicket['status'])
                                }
                                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-950 border border-slate-700 text-white cursor-pointer"
                              >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Fulfilled">Fulfilled</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedTicket(t)}
                                  className="h-7 px-2 text-[11px] bg-slate-800 border-slate-700 text-slate-200"
                                >
                                  Details
                                </Button>
                                <button
                                  onClick={() => handleDeleteTicket(t.id, t.ticketNumber)}
                                  className="p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                                  title="Delete Ticket"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 3: CITIZEN ENQUIRIES */}
          {/* ========================================================================= */}
          {activeSection === 'inquiries' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-sky-400" />
                    <span>Citizen & Hospital Enquiries Desk</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Track partnership proposals, camp organization inquiries, donor eligibility questions, and citizen feedback.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowInquiryModal(true)}
                    className="text-xs font-bold"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    <span>Log Citizen Inquiry</span>
                  </Button>
                </div>
              </div>

              {/* Filter */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search name, phone, message..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white"
                  />
                </div>

                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white font-medium"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="New">New (Unresponded)</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Archived">Archived</option>
                </select>

                <select
                  value={inquiryCategoryFilter}
                  onChange={(e) => setInquiryCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white font-medium"
                >
                  <option value="ALL">All Categories</option>
                  <option value="Hospital Partnership">Hospital Partnership</option>
                  <option value="Camp Organization">Camp Organization</option>
                  <option value="Donor Inquiry">Donor Inquiry</option>
                  <option value="Emergency Assistance">Emergency Assistance</option>
                  <option value="General Feedback">General Feedback</option>
                </select>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors shadow-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                          {inq.ticketId}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            inq.status === 'New'
                              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                              : inq.status === 'In Progress'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : inq.status === 'Resolved'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </div>

                      <div>
                        <div className="text-sm font-bold text-white">{inq.name}</div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <a href={`tel:${inq.mobile}`} className="font-mono text-red-400 font-semibold hover:underline">
                            {inq.mobile}
                          </a>
                          {inq.email && <span>· {inq.email}</span>}
                        </div>
                      </div>

                      <div className="inline-block text-[11px] font-semibold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded">
                        Category: {inq.category}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                        "{inq.message}"
                      </p>

                      {inq.responseNotes && (
                        <div className="text-[11px] text-emerald-300 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/50">
                          <strong>Response Note:</strong> {inq.responseNotes}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleUpdateInquiryStatus(inq.id, e.target.value as InquiryStatus)
                        }
                        className="text-[11px] font-bold px-2 py-1 bg-slate-950 border border-slate-700 text-white rounded-md cursor-pointer"
                      >
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Archived">Archived</option>
                      </select>

                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedInquiry(inq)}
                          className="h-7 px-2 text-[11px] bg-slate-800 border-slate-700 text-slate-200"
                        >
                          Respond
                        </Button>
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-md"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 4: VOLUNTEERS */}
          {/* ========================================================================= */}
          {activeSection === 'volunteers' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-emerald-400" />
                    <span>Field Volunteers & Community Responders</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage youth responders, emergency cold-chain escorts, and hospital liaison coordinators.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowVolunteerModal(true)}
                    className="text-xs font-bold"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    <span>Register Volunteer</span>
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search volunteer, city..."
                    value={volunteerSearch}
                    onChange={(e) => setVolunteerSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white"
                  />
                </div>

                <select
                  value={volunteerDistrictFilter}
                  onChange={(e) => setVolunteerDistrictFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white font-medium"
                >
                  <option value="ALL">All Districts</option>
                  {DISTRICTS_NEPAL.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                <select
                  value={volunteerStatusFilter}
                  onChange={(e) => setVolunteerStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white font-medium"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="On Call">On Call</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={volunteerStandbyOnly}
                    onChange={(e) => setVolunteerStandbyOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span>24/7 Standby Responders Only</span>
                </label>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredVolunteers.map((vol) => (
                  <div
                    key={vol.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors shadow-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {vol.badge}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              vol.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'
                            }`}
                          />
                          <span className="text-[11px] font-bold text-slate-300">{vol.status}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-white flex items-center justify-between">
                          <span>{vol.name}</span>
                          <span className="text-xs font-mono font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/60">
                            {vol.bloodGroup}
                          </span>
                        </h4>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {vol.role} · {vol.city}, {vol.district}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {vol.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-center">
                        <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                          <div className="text-xs font-bold text-white font-mono">{vol.totalDrivesAttended}</div>
                          <div className="text-[10px] text-slate-400">Camps Attended</div>
                        </div>
                        <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                          <div className="text-xs font-bold text-red-400 font-mono">{vol.totalDonations}</div>
                          <div className="text-[10px] text-slate-400">Pints Donated</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleVolunteerStandby(vol.id, vol.name)}
                        className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                          vol.emergencyStandby
                            ? 'bg-rose-950/60 border-rose-800 text-rose-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <Radio className={`w-3.5 h-3.5 ${vol.emergencyStandby ? 'animate-pulse text-red-400' : ''}`} />
                        <span>{vol.emergencyStandby ? 'On Standby' : 'Set Standby'}</span>
                      </button>

                      <a
                        href={`tel:${vol.mobile}`}
                        className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                        title={`Call ${vol.name}`}
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 5: TEAM MANAGEMENT */}
          {/* ========================================================================= */}
          {activeSection === 'team' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-indigo-400" />
                    <span>Leadership & Operational Team Registry</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage organization founders, executive leads, coordinators, and medical advisors of Nepal Health Sewa.
                  </p>
                </div>

                <div className="flex items-center gap-2">
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
                </div>
              </div>

              {/* Filters */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search name, role, bio..."
                    value={teamSearch}
                    onChange={(e) => setTeamSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white"
                  />
                </div>

                <select
                  value={teamDepartmentFilter}
                  onChange={(e) => setTeamDepartmentFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white font-medium"
                >
                  <option value="ALL">All Departments</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Emergency Operations">Emergency Operations</option>
                  <option value="Donor Relations">Donor Relations</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Medical Advisory">Medical Advisory</option>
                  <option value="Youth Wing">Youth Wing</option>
                </select>
              </div>

              {/* Team Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTeam.map((member) => (
                  <div
                    key={member.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors shadow-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start gap-3.5">
                        <img
                          src={member.image || '/img/logo.af0d533f.png'}
                          alt={member.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-red-500 shadow-xs shrink-0"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/img/logo.af0d533f.png';
                          }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-base font-bold text-white truncate">{member.name}</h4>
                            {member.isCore && (
                              <span className="text-[10px] font-extrabold bg-red-600/30 text-red-300 border border-red-500/40 px-1.5 py-0.5 rounded">
                                Core
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-semibold text-red-400 mt-0.5">{member.role}</div>
                          {member.department && (
                            <div className="text-[11px] text-slate-400 font-medium">{member.department}</div>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950 p-3 rounded-lg border border-slate-800">
                        "{member.bio}"
                      </p>

                      <div className="space-y-1 text-xs text-slate-400">
                        {member.phone && (
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-slate-500" />
                            <a href={`tel:${member.phone}`} className="text-red-400 font-semibold hover:underline">
                              {member.phone}
                            </a>
                          </div>
                        )}
                        {member.email && (
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-500" />
                            <span>{member.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {member.socials.facebook && (
                          <a
                            href={member.socials.facebook}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-slate-400 hover:text-blue-400 font-semibold"
                          >
                            FB
                          </a>
                        )}
                        {member.socials.instagram && (
                          <a
                            href={member.socials.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-slate-400 hover:text-pink-400 font-semibold"
                          >
                            IG
                          </a>
                        )}
                        {member.socials.twitter && (
                          <a
                            href={member.socials.twitter}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-slate-400 hover:text-sky-400 font-semibold"
                          >
                            TW
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingTeamMember(member);
                            setNewTeam({
                              name: member.name,
                              role: member.role,
                              bio: member.bio,
                              image: member.image,
                              department: member.department || 'Emergency Operations',
                              phone: member.phone || '',
                              email: member.email || '',
                              isCore: member.isCore,
                              socials: {
                                facebook: member.socials.facebook || '',
                                instagram: member.socials.instagram || '',
                                twitter: member.socials.twitter || '',
                              },
                            });
                            setShowTeamModal(true);
                          }}
                          className="h-7 px-2 text-[11px] bg-slate-800 border-slate-700 text-slate-200"
                        >
                          <Edit className="w-3.5 h-3.5 mr-1" />
                          <span>Edit</span>
                        </Button>
                        <button
                          onClick={() => handleDeleteTeam(member.id, member.name)}
                          className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-md"
                          title="Remove member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 6: BLOOD DONORS */}
          {/* ========================================================================= */}
          {activeSection === 'donors' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Droplet className="w-5 h-5 text-red-500 fill-current" />
                    <span>Voluntary Blood Donor Pool</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Live verified registry of voluntary whole blood, plasma, and platelet donors across Nepal.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowDonorModal(true)}
                    className="text-xs font-bold"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    <span>Register Voluntary Donor</span>
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search name, phone, city..."
                    value={donorSearch}
                    onChange={(e) => setDonorSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white"
                  />
                </div>

                <select
                  value={donorGroupFilter}
                  onChange={(e) => setDonorGroupFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white font-medium"
                >
                  <option value="ALL">All Blood Groups</option>
                  {BLOOD_GROUPS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>

                <select
                  value={donorDistrictFilter}
                  onChange={(e) => setDonorDistrictFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white font-medium"
                >
                  <option value="ALL">All Districts</option>
                  {DISTRICTS_NEPAL.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={donorAvailableOnly}
                    onChange={(e) => setDonorAvailableOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span>Available Donors Only</span>
                </label>
              </div>

              {/* Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
                      <tr>
                        <th className="py-3.5 px-4">Donor Name</th>
                        <th className="py-3.5 px-4">Blood Group</th>
                        <th className="py-3.5 px-4">Location</th>
                        <th className="py-3.5 px-4">Phone Contact</th>
                        <th className="py-3.5 px-4">Donations</th>
                        <th className="py-3.5 px-4">Availability</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredDonors.map((d) => (
                        <tr key={d.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white">{d.firstName} {d.lastName}</div>
                            <div className="text-[11px] text-slate-400">{d.age}y · {d.gender}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-extrabold text-xs px-2.5 py-1 rounded bg-red-950/60 text-red-300 border border-red-800/60">
                              {d.bloodGroup}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-slate-200">{d.city}</div>
                            <div className="text-[11px] text-slate-500">{d.district}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <a href={`tel:${d.mobile}`} className="font-mono font-bold text-red-400 hover:underline">
                              {d.mobile}
                            </a>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold text-white">{d.totalDonations || 0}</span> pints
                          </td>
                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => handleToggleAvailability(d.id, `${d.firstName} ${d.lastName}`)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                                d.isAvailable
                                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                                  : 'bg-slate-800 border-slate-700 text-slate-500'
                              }`}
                            >
                              {d.isAvailable ? 'Available' : 'Unavailable'}
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <a
                              href={`tel:${d.mobile}`}
                              className="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white inline-flex items-center justify-center transition-colors"
                              title="Call Donor"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 7: CAMPS & DRIVES */}
          {/* ========================================================================= */}
          {activeSection === 'campaigns' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-400" />
                    <span>Community Blood Drives & Mobile Camps</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Track mobile collection drives across Parsa, Bara, Janakpur, and Chitwan.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {campaigns.map((camp) => (
                  <div
                    key={camp.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="h-40 overflow-hidden relative">
                        <img
                          src={camp.bannerImage}
                          alt={camp.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/80 text-white backdrop-blur-xs">
                          {camp.status}
                        </span>
                      </div>

                      <div className="p-5 space-y-2.5">
                        <div className="text-[11px] font-bold text-red-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{camp.date}</span>
                        </div>
                        <h4 className="text-base font-bold text-white leading-snug">{camp.title}</h4>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{camp.venue}, {camp.district}</span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2">{camp.description}</p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-800 flex items-center justify-between mt-2">
                      <div className="text-xs font-bold text-white">
                        Units: <span className="text-red-400 font-mono">{camp.unitsCollected || camp.attendance}</span>
                      </div>
                      <Link to={`/campaign/${camp.slug}`}>
                        <Button variant="outline" size="sm" className="text-xs h-7 px-2.5 bg-slate-800 border-slate-700 text-slate-200">
                          View Camp
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 8: REGIONAL BLOOD CENTERS */}
          {/* ========================================================================= */}
          {activeSection === 'blood-banks' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-slate-300" />
                  <span>Regional Blood Transfusion Centers & Hospital Liaison</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Direct emergency hotlines and operational hours for certified blood centers in Madhesh, Bagmati, and Gandaki provinces.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 border-l-4 border-l-red-500">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Primary Partner · Parsa</span>
                    <h3 className="text-lg font-bold text-white">Narayani Hospital Blood Bank</h3>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>Hospital Road, Birgunj</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Zonal referral blood bank maintaining continuous whole blood testing, component preparation, and cross-matching for Parsa & Bara districts.
                  </p>
                  <div className="pt-2 border-t border-slate-800 space-y-1.5">
                    <div className="text-xs font-bold text-slate-400">Direct Hotline:</div>
                    <a href="tel:051521993" className="text-sm font-mono font-bold text-red-400 hover:underline block">
                      051-521993 / 051-522108
                    </a>
                    <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Open 24 Hours / 7 Days</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 border-l-4 border-l-rose-500">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Nepal Red Cross · Parsa</span>
                    <h3 className="text-lg font-bold text-white">Nepal Red Cross Society Blood Center</h3>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>Ghantaghar Chowk, Birgunj</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Community collection center and mobile blood donation logistics partner in Parsa coordinating replacement donors and camps.
                  </p>
                  <div className="pt-2 border-t border-slate-800 space-y-1.5">
                    <div className="text-xs font-bold text-slate-400">Direct Hotline:</div>
                    <a href="tel:051522137" className="text-sm font-mono font-bold text-red-400 hover:underline block">
                      051-522137
                    </a>
                    <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Open 24 Hours / 7 Days</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 border-l-4 border-l-amber-500">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Central Transfusion Service</span>
                    <h3 className="text-lg font-bold text-white">Central Blood Transfusion Service</h3>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>Exhibition Road, Kathmandu</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    National apex blood center coordinating rare blood group exchange, nationwide stock audits, and inter-district transport.
                  </p>
                  <div className="pt-2 border-t border-slate-800 space-y-1.5">
                    <div className="text-xs font-bold text-slate-400">Direct Hotline:</div>
                    <a href="tel:014288485" className="text-sm font-mono font-bold text-red-400 hover:underline block">
                      01-4288485 / 01-4288486
                    </a>
                    <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Open 24 Hours / 7 Days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 9: SYSTEM SETTINGS & EXPORTS */}
          {/* ========================================================================= */}
          {activeSection === 'settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-slate-300" />
                  <span>Operations System & Data Management</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Manage operational parameters, export records for hospital reports, and inspect local database persistence.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Export Operations Data</span>
                </h3>
                <p className="text-xs text-slate-300">
                  Download timestamped CSV spreadsheets for emergency triage audits, donor counts, and citizen inquiry response logs.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportTicketsCSV}
                    className="text-xs bg-slate-800 border-slate-700 text-slate-200"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                    <span>Download Emergency Tickets CSV</span>
                  </Button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-sky-400" />
                  <span>Local Storage Persistence Status</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="font-mono text-base font-bold text-white">{tickets.length}</div>
                    <div className="text-[11px] text-slate-400">Emergency Tickets</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="font-mono text-base font-bold text-white">{inquiries.length}</div>
                    <div className="text-[11px] text-slate-400">Citizen Inquiries</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="font-mono text-base font-bold text-white">{volunteers.length}</div>
                    <div className="text-[11px] text-slate-400">Active Volunteers</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="font-mono text-base font-bold text-white">{team.length}</div>
                    <div className="text-[11px] text-slate-400">Team Members</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: NEW EMERGENCY TICKET MODAL */}
      {/* ========================================================================= */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative my-8 text-slate-100">
            <button
              onClick={() => setShowTicketModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>24/7 Operations Desk</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">Dispatch Emergency Request</h3>
              <p className="text-xs text-slate-400">
                Log critical medical requests for immediate volunteer mobilization.
              </p>
            </div>

            <form onSubmit={handleCreateTicketSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Service Type *</label>
                  <select
                    value={newTicket.sewaType}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, sewaType: e.target.value as EmergencyServiceType })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg font-bold text-white"
                  >
                    <option value="Blood">Blood Transfusion</option>
                    <option value="Oxygen">Oxygen Cylinder</option>
                    <option value="Ambulance">Ambulance Transit</option>
                    <option value="Bed Availability">Hospital ICU Bed</option>
                    <option value="Medicine">Medicine Supply</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Urgency Priority *</label>
                  <select
                    value={newTicket.urgency}
                    onChange={(e) =>
                      setNewTicket({
                        ...newTicket,
                        urgency: e.target.value as 'Immediate (Within 2 hrs)' | 'Today (Within 6 hrs)' | 'Scheduled',
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg font-bold text-white"
                  >
                    <option value="Immediate (Within 2 hrs)">Immediate (Within 2 hrs)</option>
                    <option value="Today (Within 6 hrs)">Today (Within 6 hrs)</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
              </div>

              {newTicket.sewaType === 'Blood' && (
                <div className="grid grid-cols-2 gap-3 p-3 bg-red-950/40 rounded-xl border border-red-800/60">
                  <div>
                    <label className="block text-xs font-semibold text-red-300 mb-1">Blood Group *</label>
                    <select
                      value={newTicket.bloodGroup}
                      onChange={(e) =>
                        setNewTicket({ ...newTicket, bloodGroup: e.target.value as BloodGroup })
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-950 border border-red-700 rounded-lg font-bold text-white"
                    >
                      {BLOOD_GROUPS.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-red-300 mb-1">Units / Pints *</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={newTicket.unitsNeeded}
                      onChange={(e) => setNewTicket({ ...newTicket, unitsNeeded: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs bg-slate-950 border border-red-700 rounded-lg font-bold text-white"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Patient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Shrestha"
                    value={newTicket.patientName}
                    onChange={(e) => setNewTicket({ ...newTicket, patientName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Age *</label>
                  <input
                    type="number"
                    required
                    value={newTicket.patientAge}
                    onChange={(e) => setNewTicket({ ...newTicket, patientAge: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hospital / Clinic *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Narayani Hospital, ICU Ward 3"
                    value={newTicket.hospitalName}
                    onChange={(e) => setNewTicket({ ...newTicket, hospitalName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Phone (10 digits) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9845012345"
                    value={newTicket.contactMobile}
                    onChange={(e) => setNewTicket({ ...newTicket, contactMobile: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg font-mono font-bold text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Clinical Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Doctor's name, surgery schedule, specific requirements..."
                  value={newTicket.message}
                  onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowTicketModal(false)} className="bg-slate-800 border-slate-700 text-slate-200">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white">{selectedTicket.ticketNumber}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-600/30 text-red-300 border border-red-500/40">
                  {selectedTicket.sewaType}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">{selectedTicket.patientName}</h3>
              <div className="text-xs text-slate-400">
                {selectedTicket.patientAge} years · {selectedTicket.gender} · Admitted at {selectedTicket.hospitalName}
              </div>
            </div>

            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Hospital Address:</span>
                <span className="font-semibold text-white">{selectedTicket.hospitalAddress}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Emergency Contact:</span>
                <span className="font-semibold text-white">
                  {selectedTicket.contactName} ({selectedTicket.contactMobile})
                </span>
              </div>
              {selectedTicket.bloodGroup && (
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Blood Requisition:</span>
                  <span className="font-bold text-red-400 font-mono">
                    {selectedTicket.unitsNeeded || 1} Pint(s) of {selectedTicket.bloodGroup}
                  </span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Urgency Level:</span>
                <span className="font-bold text-rose-400">{selectedTicket.urgency}</span>
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
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-red-700 transition-colors shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {selectedTicket.contactMobile}</span>
              </a>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTicket(null)}
                className="bg-slate-800 border-slate-700 text-slate-200"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span>Citizen Communications</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">Log New Inquiry</h3>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Citizen / Hospital Rep Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rabin Shrestha"
                  value={newInquiry.name}
                  onChange={(e) => setNewInquiry({ ...newInquiry, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9845012345"
                    value={newInquiry.mobile}
                    onChange={(e) => setNewInquiry({ ...newInquiry, mobile: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg font-mono font-bold text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
                  <select
                    value={newInquiry.category}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, category: e.target.value as InquiryCategory })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg font-semibold text-white"
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Inquiry Notes *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summary of request, question, or phone discussion..."
                  value={newInquiry.message}
                  onChange={(e) => setNewInquiry({ ...newInquiry, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowInquiryModal(false)} className="bg-slate-800 border-slate-700 text-slate-200">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">{selectedInquiry.ticketId}</div>
              <h3 className="text-lg font-bold text-white mt-1">{selectedInquiry.name}</h3>
              <div className="text-xs text-slate-400">Phone: {selectedInquiry.mobile} · {selectedInquiry.category}</div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
              "{selectedInquiry.message}"
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Add Coordinator Response Note</label>
              <textarea
                rows={2}
                placeholder="Called citizen, coordinated with blood bank..."
                defaultValue={selectedInquiry.responseNotes || ''}
                id="responseNoteInput"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`tel:${selectedInquiry.mobile}`}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs flex items-center gap-1.5"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setShowVolunteerModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <UserCheck className="w-4 h-4" />
                <span>Community Force</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">Register New Volunteer</h3>
            </div>

            <form onSubmit={handleVolunteerSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Giri"
                    value={newVolunteer.name}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Volunteer Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Field Responder"
                    value={newVolunteer.role}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">District *</label>
                  <select
                    value={newVolunteer.district}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, district: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  >
                    {DISTRICTS_NEPAL.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={newVolunteer.city}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Blood Group *</label>
                  <select
                    value={newVolunteer.bloodGroup}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, bloodGroup: e.target.value as BloodGroup })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg font-bold text-white"
                  >
                    {BLOOD_GROUPS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile (10 digits) *</label>
                  <input
                    type="tel"
                    required
                    value={newVolunteer.mobile}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, mobile: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg font-mono font-bold text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Recognition Badge</label>
                  <select
                    value={newVolunteer.badge}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, badge: e.target.value as VolunteerBadge })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg font-semibold text-white"
                  >
                    <option value="Youth Lead">Youth Lead</option>
                    <option value="Gold Responder">Gold Responder</option>
                    <option value="Field Medic">Field Medic</option>
                    <option value="Star Donor">Star Donor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Key Skills (comma separated)</label>
                <input
                  type="text"
                  placeholder="Cold Chain Transport, Hospital Liaison, First Aid..."
                  value={newVolunteer.skills}
                  onChange={(e) => setNewVolunteer({ ...newVolunteer, skills: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer">
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
                <Button variant="outline" size="sm" type="button" onClick={() => setShowVolunteerModal(false)} className="bg-slate-800 border-slate-700 text-slate-200">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative text-slate-100">
            <button
              onClick={() => {
                setShowTeamModal(false);
                setEditingTeamMember(null);
              }}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span>Executive Registry</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {editingTeamMember ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>
            </div>

            <form onSubmit={handleTeamSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayub Alam"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Official Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Operations Lead"
                    value={newTeam.role}
                    onChange={(e) => setNewTeam({ ...newTeam, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Department *</label>
                  <select
                    value={newTeam.department}
                    onChange={(e) =>
                      setNewTeam({ ...newTeam, department: e.target.value as TeamMember['department'] })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg font-semibold text-white"
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9845012345"
                    value={newTeam.phone}
                    onChange={(e) => setNewTeam({ ...newTeam, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Bio / Mission Statement</label>
                <textarea
                  rows={2}
                  placeholder="Helping others without expecting anything in return..."
                  value={newTeam.bio}
                  onChange={(e) => setNewTeam({ ...newTeam, bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer">
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
                  className="bg-slate-800 border-slate-700 text-slate-200"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setShowDonorModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                <Droplet className="w-4 h-4 fill-current" />
                <span>Voluntary Blood Network</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">Register Voluntary Blood Donor</h3>
            </div>

            <form onSubmit={handleDonorSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={newDonor.firstName}
                    onChange={(e) => setNewDonor({ ...newDonor, firstName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={newDonor.lastName}
                    onChange={(e) => setNewDonor({ ...newDonor, lastName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Blood Group *</label>
                  <select
                    value={newDonor.bloodGroup}
                    onChange={(e) => setNewDonor({ ...newDonor, bloodGroup: e.target.value as BloodGroup })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg font-bold text-white"
                  >
                    {BLOOD_GROUPS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Gender *</label>
                  <select
                    value={newDonor.gender}
                    onChange={(e) => setNewDonor({ ...newDonor, gender: e.target.value as Gender })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Age *</label>
                  <input
                    type="number"
                    min={18}
                    max={65}
                    value={newDonor.age}
                    onChange={(e) => setNewDonor({ ...newDonor, age: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">District *</label>
                  <select
                    value={newDonor.district}
                    onChange={(e) => setNewDonor({ ...newDonor, district: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  >
                    {DISTRICTS_NEPAL.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City / Municipality *</label>
                  <input
                    type="text"
                    required
                    value={newDonor.city}
                    onChange={(e) => setNewDonor({ ...newDonor, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Phone (10 digits) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9845012345"
                  value={newDonor.mobile}
                  onChange={(e) => setNewDonor({ ...newDonor, mobile: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg font-mono font-bold text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowDonorModal(false)} className="bg-slate-800 border-slate-700 text-slate-200">
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
