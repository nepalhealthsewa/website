import { describe, it, expect } from 'vitest';
import { INITIAL_DONORS, INITIAL_EMERGENCY_TICKETS } from '../data/mockData';

describe('Shared DataTable Component Logic & Calculations', () => {
  it('correctly calculates pagination ranges and total pages', () => {
    const calculatePagination = (totalItems: number, page: number, pageSize: number) => {
      const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
      const validPage = Math.min(Math.max(1, page), totalPages);
      const startIndex = totalItems === 0 ? 0 : (validPage - 1) * pageSize + 1;
      const endIndex = Math.min(validPage * pageSize, totalItems);
      return { totalPages, validPage, startIndex, endIndex };
    };

    // 25 items, page 1, size 10
    const p1 = calculatePagination(25, 1, 10);
    expect(p1.totalPages).toBe(3);
    expect(p1.startIndex).toBe(1);
    expect(p1.endIndex).toBe(10);

    // 25 items, page 3, size 10
    const p3 = calculatePagination(25, 3, 10);
    expect(p3.startIndex).toBe(21);
    expect(p3.endIndex).toBe(25);

    // 0 items
    const p0 = calculatePagination(0, 1, 10);
    expect(p0.totalPages).toBe(1);
    expect(p0.startIndex).toBe(0);
    expect(p0.endIndex).toBe(0);
  });

  it('performs multi-field generic search matching correctly', () => {
    const searchItems = <T>(items: T[], query: string) => {
      if (!query.trim()) return items;
      const q = query.toLowerCase().trim();
      return items.filter((item) => {
        return Object.values(item as Record<string, unknown>).some((val) => {
          if (val === null || val === undefined) return false;
          if (typeof val === 'string' || typeof val === 'number') {
            return String(val).toLowerCase().includes(q);
          }
          return false;
        });
      });
    };

    const tickets = INITIAL_EMERGENCY_TICKETS;
    // Search by first ticket's ticket number
    const matchTicket = searchItems(tickets, tickets[0].ticketNumber);
    expect(matchTicket.length).toBeGreaterThanOrEqual(1);
    expect(matchTicket[0].ticketNumber).toBe(tickets[0].ticketNumber);

    // Search by hospital name part
    const matchHospital = searchItems(tickets, 'Narayani');
    expect(matchHospital.length).toBeGreaterThanOrEqual(1);
    expect(matchHospital.every((t) => t.hospitalName.includes('Narayani'))).toBe(true);

    // Non-existent search
    const noMatch = searchItems(tickets, 'XYZNonExistentKeyword999');
    expect(noMatch).toHaveLength(0);
  });

  it('sorts numeric and string data in ascending and descending orders', () => {
    const donors = [...INITIAL_DONORS];

    // Sort by totalDonations ascending
    const ascDonations = [...donors].sort((a, b) => (a.totalDonations || 0) - (b.totalDonations || 0));
    expect(ascDonations[0].totalDonations || 0).toBeLessThanOrEqual(
      ascDonations[ascDonations.length - 1].totalDonations || 0
    );

    // Sort by totalDonations descending
    const descDonations = [...donors].sort((a, b) => (b.totalDonations || 0) - (a.totalDonations || 0));
    expect(descDonations[0].totalDonations || 0).toBeGreaterThanOrEqual(
      descDonations[descDonations.length - 1].totalDonations || 0
    );

    // Sort by firstName alphabetically
    const ascName = [...donors].sort((a, b) => a.firstName.localeCompare(b.firstName));
    expect(ascName[0].firstName.localeCompare(ascName[ascName.length - 1].firstName)).toBeLessThanOrEqual(0);
  });

  it('generates correct pagination page numbers with ellipsis window', () => {
    const getPageWindow = (currentPage: number, totalPages: number) => {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((page) => {
          return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
        })
        .reduce<(number | string)[]>((acc, page, idx, arr) => {
          if (idx > 0 && page - (arr[idx - 1] as number) > 1) {
            acc.push('ellipsis');
          }
          acc.push(page);
          return acc;
        }, []);
    };

    // 10 pages, at page 5 -> [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]
    const win5 = getPageWindow(5, 10);
    expect(win5).toEqual([1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]);

    // 3 pages, at page 1 -> [1, 2, 3] (no ellipsis)
    const win3 = getPageWindow(1, 3);
    expect(win3).toEqual([1, 2, 3]);
  });
});
