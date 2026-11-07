import { api } from './api';
import {
  BloodDonor,
  Campaign,
  EmergencyTicket,
  DiseaseInfo,
  BloodGroup,
  ContactInquiry,
  TeamMember,
  VolunteerProfile,
  InquiryStatus,
  VolunteerStatus,
} from '../types';
import {
  INITIAL_DONORS,
  CAMPAIGNS,
  DISEASES_DATA,
  INITIAL_EMERGENCY_TICKETS,
  INITIAL_INQUIRIES,
  INITIAL_VOLUNTEERS,
  TEAM_MEMBERS,
} from '../data/mockData';

const DONORS_STORAGE_KEY = 'nepal_health_sewa_donors';
const EMERGENCY_STORAGE_KEY = 'nepal_health_sewa_emergency_tickets';
const INQUIRIES_STORAGE_KEY = 'nepal_health_sewa_inquiries';
const TEAM_STORAGE_KEY = 'nepal_health_sewa_team_members';
const VOLUNTEERS_STORAGE_KEY = 'nepal_health_sewa_volunteers';

function getStoredDonors(): BloodDonor[] {
  if (typeof localStorage === 'undefined') return INITIAL_DONORS;
  try {
    const raw = localStorage.getItem(DONORS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(DONORS_STORAGE_KEY, JSON.stringify(INITIAL_DONORS));
      return INITIAL_DONORS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DONORS;
  }
}

function saveDonors(donors: BloodDonor[]) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(DONORS_STORAGE_KEY, JSON.stringify(donors));
  } catch (e) {
    console.error('Failed to save donors to local storage', e);
  }
}

function getStoredEmergencyTickets(): EmergencyTicket[] {
  if (typeof localStorage === 'undefined') return INITIAL_EMERGENCY_TICKETS;
  try {
    const raw = localStorage.getItem(EMERGENCY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(EMERGENCY_STORAGE_KEY, JSON.stringify(INITIAL_EMERGENCY_TICKETS));
      return INITIAL_EMERGENCY_TICKETS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_EMERGENCY_TICKETS;
  }
}

function saveEmergencyTickets(tickets: EmergencyTicket[]) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(EMERGENCY_STORAGE_KEY, JSON.stringify(tickets));
  } catch (e) {
    console.error('Failed to save tickets', e);
  }
}

function getStoredInquiries(): ContactInquiry[] {
  if (typeof localStorage === 'undefined') return INITIAL_INQUIRIES;
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(INITIAL_INQUIRIES));
      return INITIAL_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_INQUIRIES;
  }
}

function saveInquiries(inquiries: ContactInquiry[]) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(inquiries));
  } catch (e) {
    console.error('Failed to save inquiries', e);
  }
}

function getStoredTeamMembers(): TeamMember[] {
  if (typeof localStorage === 'undefined') return TEAM_MEMBERS;
  try {
    const raw = localStorage.getItem(TEAM_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(TEAM_MEMBERS));
      return TEAM_MEMBERS;
    }
    return JSON.parse(raw);
  } catch {
    return TEAM_MEMBERS;
  }
}

function saveTeamMembers(team: TeamMember[]) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(team));
  } catch (e) {
    console.error('Failed to save team members', e);
  }
}

function getStoredVolunteers(): VolunteerProfile[] {
  if (typeof localStorage === 'undefined') return INITIAL_VOLUNTEERS;
  try {
    const raw = localStorage.getItem(VOLUNTEERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(VOLUNTEERS_STORAGE_KEY, JSON.stringify(INITIAL_VOLUNTEERS));
      return INITIAL_VOLUNTEERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_VOLUNTEERS;
  }
}

function saveVolunteers(volunteers: VolunteerProfile[]) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(VOLUNTEERS_STORAGE_KEY, JSON.stringify(volunteers));
  } catch (e) {
    console.error('Failed to save volunteers', e);
  }
}

export interface DonorFilters {
  bloodGroup?: string;
  district?: string;
  search?: string;
  availableOnly?: boolean;
}

export const healthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDonors: builder.query<{ donors: BloodDonor[]; total: number }, DonorFilters | void>({
      async queryFn(filters = {}) {
        await new Promise((r) => setTimeout(r, 200));
        let list = getStoredDonors();

        if (filters?.bloodGroup && filters.bloodGroup !== 'ALL') {
          list = list.filter((d) => d.bloodGroup === filters.bloodGroup);
        }

        if (filters?.district && filters.district !== 'ALL') {
          list = list.filter(
            (d) => d.district.toLowerCase() === filters.district!.toLowerCase()
          );
        }

        if (filters?.availableOnly) {
          list = list.filter((d) => d.isAvailable);
        }

        if (filters?.search && filters.search.trim()) {
          const q = filters.search.toLowerCase().trim();
          list = list.filter(
            (d) =>
              d.firstName.toLowerCase().includes(q) ||
              d.lastName.toLowerCase().includes(q) ||
              d.city.toLowerCase().includes(q) ||
              d.district.toLowerCase().includes(q) ||
              d.mobile.includes(q)
          );
        }

        return { data: { donors: list, total: list.length } };
      },
      providesTags: ['Donors'],
    }),

    addDonor: builder.mutation<BloodDonor, Omit<BloodDonor, 'id' | 'isAvailable' | 'totalDonations' | 'verified'>>({
      async queryFn(newDonorData) {
        await new Promise((r) => setTimeout(r, 400));
        const current = getStoredDonors();
        const created: BloodDonor = {
          ...newDonorData,
          id: `donor-${Date.now()}`,
          isAvailable: true,
          totalDonations: 0,
          verified: true,
          lastDonated: new Date().toISOString().split('T')[0],
        };
        const updated = [created, ...current];
        saveDonors(updated);
        return { data: created };
      },
      invalidatesTags: ['Donors'],
    }),

    getCampaigns: builder.query<Campaign[], void>({
      async queryFn() {
        await new Promise((r) => setTimeout(r, 150));
        return { data: CAMPAIGNS };
      },
      providesTags: ['Campaigns'],
    }),

    getCampaignBySlug: builder.query<Campaign | null, string>({
      async queryFn(slug) {
        await new Promise((r) => setTimeout(r, 150));
        const found = CAMPAIGNS.find((c) => c.slug === slug || c.id === slug);
        return { data: found || null };
      },
      providesTags: ['Campaigns'],
    }),

    getEmergencyTickets: builder.query<EmergencyTicket[], void>({
      async queryFn() {
        await new Promise((r) => setTimeout(r, 200));
        return { data: getStoredEmergencyTickets() };
      },
      providesTags: ['Emergency'],
    }),

    createEmergencyTicket: builder.mutation<EmergencyTicket, Omit<EmergencyTicket, 'id' | 'ticketNumber' | 'status' | 'createdAt'>>({
      async queryFn(ticketInput) {
        await new Promise((r) => setTimeout(r, 500));
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const newTicket: EmergencyTicket = {
          ...ticketInput,
          id: `ticket-${Date.now()}`,
          ticketNumber: `NHS-${new Date().getFullYear()}-${randomNum}`,
          status: 'Pending',
          createdAt: new Date().toISOString(),
        };
        const current = getStoredEmergencyTickets();
        saveEmergencyTickets([newTicket, ...current]);
        return { data: newTicket };
      },
      invalidatesTags: ['Emergency'],
    }),

    updateEmergencyTicketStatus: builder.mutation<EmergencyTicket, { id: string; status: EmergencyTicket['status'] }>({
      async queryFn({ id, status }) {
        await new Promise((r) => setTimeout(r, 200));
        const tickets = getStoredEmergencyTickets();
        let target: EmergencyTicket | null = null;
        const updated = tickets.map((t) => {
          if (t.id === id) {
            target = { ...t, status };
            return target;
          }
          return t;
        });
        if (target) {
          saveEmergencyTickets(updated);
          return { data: target };
        }
        return { error: { status: 404, data: 'Ticket not found' } };
      },
      invalidatesTags: ['Emergency'],
    }),

    deleteEmergencyTicket: builder.mutation<{ success: boolean; id: string }, string>({
      async queryFn(id) {
        await new Promise((r) => setTimeout(r, 200));
        const tickets = getStoredEmergencyTickets();
        const updated = tickets.filter((t) => t.id !== id);
        saveEmergencyTickets(updated);
        return { data: { success: true, id } };
      },
      invalidatesTags: ['Emergency'],
    }),

    toggleDonorAvailability: builder.mutation<BloodDonor, string>({
      async queryFn(id) {
        await new Promise((r) => setTimeout(r, 200));
        const donors = getStoredDonors();
        let target: BloodDonor | null = null;
        const updated = donors.map((d) => {
          if (d.id === id) {
            target = { ...d, isAvailable: !d.isAvailable };
            return target;
          }
          return d;
        });
        if (target) {
          saveDonors(updated);
          return { data: target };
        }
        return { error: { status: 404, data: 'Donor not found' } };
      },
      invalidatesTags: ['Donors'],
    }),

    getDiseases: builder.query<DiseaseInfo[], void>({
      async queryFn() {
        await new Promise((r) => setTimeout(r, 100));
        return { data: DISEASES_DATA };
      },
    }),

    getDiseaseBySlug: builder.query<DiseaseInfo | null, string>({
      async queryFn(slug) {
        await new Promise((r) => setTimeout(r, 100));
        const found = DISEASES_DATA.find((d) => d.slug === slug);
        return { data: found || null };
      },
    }),

    getInquiries: builder.query<ContactInquiry[], void>({
      async queryFn() {
        await new Promise((r) => setTimeout(r, 150));
        return { data: getStoredInquiries() };
      },
      providesTags: ['Inquiries'],
    }),

    submitInquiry: builder.mutation<ContactInquiry, { name: string; mobile: string; email?: string; message: string; category?: ContactInquiry['category'] }>({
      async queryFn(inquiry) {
        await new Promise((r) => setTimeout(r, 400));
        const current = getStoredInquiries();
        const randNum = Math.floor(100 + Math.random() * 900);
        const newInq: ContactInquiry = {
          id: `inq-${Date.now()}`,
          ticketId: `INQ-${new Date().getFullYear()}-${randNum}`,
          name: inquiry.name,
          mobile: inquiry.mobile,
          email: inquiry.email,
          category: inquiry.category || 'General Feedback',
          message: inquiry.message,
          status: 'New',
          priority: 'Normal',
          createdAt: new Date().toISOString(),
        };
        saveInquiries([newInq, ...current]);
        return { data: newInq };
      },
      invalidatesTags: ['Inquiries'],
    }),

    updateInquiryStatus: builder.mutation<ContactInquiry, { id: string; status: InquiryStatus; responseNotes?: string; assignedTo?: string }>({
      async queryFn({ id, status, responseNotes, assignedTo }) {
        await new Promise((r) => setTimeout(r, 200));
        const inquiries = getStoredInquiries();
        let target: ContactInquiry | null = null;
        const updated = inquiries.map((item) => {
          if (item.id === id) {
            target = {
              ...item,
              status,
              ...(responseNotes !== undefined ? { responseNotes } : {}),
              ...(assignedTo !== undefined ? { assignedTo } : {}),
            };
            return target;
          }
          return item;
        });
        if (target) {
          saveInquiries(updated);
          return { data: target };
        }
        return { error: { status: 404, data: 'Inquiry not found' } };
      },
      invalidatesTags: ['Inquiries'],
    }),

    deleteInquiry: builder.mutation<{ success: boolean; id: string }, string>({
      async queryFn(id) {
        await new Promise((r) => setTimeout(r, 200));
        const current = getStoredInquiries();
        saveInquiries(current.filter((item) => item.id !== id));
        return { data: { success: true, id } };
      },
      invalidatesTags: ['Inquiries'],
    }),

    getTeamMembers: builder.query<TeamMember[], void>({
      async queryFn() {
        await new Promise((r) => setTimeout(r, 150));
        return { data: getStoredTeamMembers() };
      },
      providesTags: ['Team'],
    }),

    addTeamMember: builder.mutation<TeamMember, Omit<TeamMember, 'id'>>({
      async queryFn(memberInput) {
        await new Promise((r) => setTimeout(r, 300));
        const current = getStoredTeamMembers();
        const created: TeamMember = {
          ...memberInput,
          id: `team-${Date.now()}`,
          status: memberInput.status || 'Active',
        };
        saveTeamMembers([...current, created]);
        return { data: created };
      },
      invalidatesTags: ['Team'],
    }),

    updateTeamMember: builder.mutation<TeamMember, TeamMember>({
      async queryFn(memberInput) {
        await new Promise((r) => setTimeout(r, 250));
        const current = getStoredTeamMembers();
        const updated = current.map((m) => (m.id === memberInput.id ? memberInput : m));
        saveTeamMembers(updated);
        return { data: memberInput };
      },
      invalidatesTags: ['Team'],
    }),

    deleteTeamMember: builder.mutation<{ success: boolean; id: string }, string>({
      async queryFn(id) {
        await new Promise((r) => setTimeout(r, 200));
        const current = getStoredTeamMembers();
        saveTeamMembers(current.filter((m) => m.id !== id));
        return { data: { success: true, id } };
      },
      invalidatesTags: ['Team'],
    }),

    getVolunteers: builder.query<VolunteerProfile[], void>({
      async queryFn() {
        await new Promise((r) => setTimeout(r, 150));
        return { data: getStoredVolunteers() };
      },
      providesTags: ['Volunteers'],
    }),

    toggleVolunteerStandby: builder.mutation<VolunteerProfile, string>({
      async queryFn(id) {
        await new Promise((r) => setTimeout(r, 200));
        const volunteers = getStoredVolunteers();
        let target: VolunteerProfile | null = null;
        const updated = volunteers.map((v) => {
          if (v.id === id) {
            target = { ...v, emergencyStandby: !v.emergencyStandby };
            return target;
          }
          return v;
        });
        if (target) {
          saveVolunteers(updated);
          return { data: target };
        }
        return { error: { status: 404, data: 'Volunteer not found' } };
      },
      invalidatesTags: ['Volunteers'],
    }),

    updateVolunteerStatus: builder.mutation<VolunteerProfile, { id: string; status: VolunteerStatus }>({
      async queryFn({ id, status }) {
        await new Promise((r) => setTimeout(r, 200));
        const volunteers = getStoredVolunteers();
        let target: VolunteerProfile | null = null;
        const updated = volunteers.map((v) => {
          if (v.id === id) {
            target = { ...v, status };
            return target;
          }
          return v;
        });
        if (target) {
          saveVolunteers(updated);
          return { data: target };
        }
        return { error: { status: 404, data: 'Volunteer not found' } };
      },
      invalidatesTags: ['Volunteers'],
    }),

    addVolunteer: builder.mutation<VolunteerProfile, Omit<VolunteerProfile, 'id'>>({
      async queryFn(volInput) {
        await new Promise((r) => setTimeout(r, 300));
        const current = getStoredVolunteers();
        const created: VolunteerProfile = {
          ...volInput,
          id: `vol-${Date.now()}`,
          joinedDate: new Date().toISOString().split('T')[0],
        };
        saveVolunteers([created, ...current]);
        return { data: created };
      },
      invalidatesTags: ['Volunteers'],
    }),
  }),
});

export const {
  useGetDonorsQuery,
  useAddDonorMutation,
  useToggleDonorAvailabilityMutation,
  useGetCampaignsQuery,
  useGetCampaignBySlugQuery,
  useGetEmergencyTicketsQuery,
  useCreateEmergencyTicketMutation,
  useUpdateEmergencyTicketStatusMutation,
  useDeleteEmergencyTicketMutation,
  useGetDiseasesQuery,
  useGetDiseaseBySlugQuery,
  useSubmitInquiryMutation,
  useGetInquiriesQuery,
  useUpdateInquiryStatusMutation,
  useDeleteInquiryMutation,
  useGetTeamMembersQuery,
  useAddTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useGetVolunteersQuery,
  useToggleVolunteerStandbyMutation,
  useUpdateVolunteerStatusMutation,
  useAddVolunteerMutation,
} = healthApi;
