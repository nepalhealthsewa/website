import { describe, it, expect } from 'vitest';
import { queryKnowledgeBase, BOT_KNOWLEDGE_BASE } from '../data/chatbotKnowledge';

describe('Health Chatbot Knowledge Base & Matcher', () => {
  it('returns welcome greeting on greeting tokens', () => {
    const res = queryKnowledgeBase('namaste');
    expect(res.id).toBe('greetings');
    expect(res.response).toContain('Namaste! 🙏 Welcome to Nepal Health Sewa');
  });

  it('matches blood donor search inquiries', () => {
    const res = queryKnowledgeBase('how can I find a blood donor in Birgunj?');
    expect(res.id).toBe('blood-find');
    expect(res.actionLinks?.some((l) => l.path === '/blood-bank')).toBe(true);
  });

  it('matches blood donation eligibility criteria', () => {
    const res = queryKnowledgeBase('who can donate blood and what weight is needed?');
    expect(res.id).toBe('blood-eligibility');
    expect(res.response).toContain('45 kg');
    expect(res.response).toContain('90 days');
  });

  it('matches emergency hotlines and ambulance questions', () => {
    const res = queryKnowledgeBase('what is the emergency hotline and ambulance number?');
    expect(res.id).toBe('emergency-services');
    expect(res.response).toContain('102');
    expect(res.response).toContain('+977 9845012345');
  });

  it('matches BMI calculator queries', () => {
    const res = queryKnowledgeBase('tell me about bmi calculation and asian cutoff');
    expect(res.id).toBe('bmi-tool');
    expect(res.response).toContain('23.0');
  });

  it('matches COVID-19 guidance', () => {
    const res = queryKnowledgeBase('what are symptoms and masks for covid-19?');
    expect(res.id).toBe('covid-guidelines');
    expect(res.actionLinks?.some((l) => l.path === '/covid-guidelines')).toBe(true);
  });

  it('provides safe fallback suggestions for unknown phrases', () => {
    const res = queryKnowledgeBase('quantum physics astronomy telescope');
    expect(res.id).toBe('fallback');
    expect(res.suggestedFollowUps?.length).toBeGreaterThan(0);
  });

  it('contains valid knowledge base entries with keywords and responses', () => {
    expect(BOT_KNOWLEDGE_BASE.length).toBeGreaterThan(0);
    BOT_KNOWLEDGE_BASE.forEach((entry) => {
      expect(entry.id).toBeTruthy();
      expect(entry.response.length).toBeGreaterThan(0);
    });
  });
});
