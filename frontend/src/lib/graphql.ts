import { GraphQLClient, gql } from 'graphql-request';

const GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || 'http://localhost:8080/graphql';

export const client = new GraphQLClient(GRAPHQL_URL);

export interface Event {
  id: string;
  title: string;
  date: string;
  slug: string;
  eventFields?: {
    djName?: string;
    location?: string;
    startTime?: string;
  };
}

export interface Artist {
  id: string;
  title: string;
  slug: string;
  featuredImage?: { node: { sourceUrl: string; altText: string } };
}

export interface SkateEvent {
  title: string;
  databaseId: number;
  eventFields: {
    eventDate: string; // ISO 8601 e.g. "2026-06-28T00:00:00+00:00"
    eventDjs: Array<{
      eventDj: {
        edges: Array<{
          node: {
            id: string;
            djFields: { djName: string };
          };
        }>;
      };
    }> | null;
  };
}

export interface DJ {
  databaseId: number;
  title: string;
  djFields: {
    djName: string;
    djBio: string;
    djPhoto: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    } | null;
    djSocials: {
      djInstagramLink: string | null;
      djSoundcloudLink: string | null;
      djMixcloudLink: string | null;
      djYoutubeLink: string | null;
      djFacebookLink: string | null;
      djWebsiteLink: string | null;
    } | null;
  };
}

export const GET_UPCOMING_EVENTS = gql`
  query GetUpcomingEvents {
    events(first: 6, where: { orderby: { field: DATE, order: ASC } }) {
      nodes {
        id
        title
        date
        slug
        eventFields {
          djName
          location
          startTime
        }
      }
    }
  }
`;

export const GET_ARTISTS = gql`
  query GetArtists {
    artists(first: 6) {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_DJS = gql`
  query GetAllDJs {
    djs(first: 100) {
      nodes {
        title
        databaseId
        djFields {
          djName
          djBio
          djPhoto {
            node {
              sourceUrl
              altText
            }
          }
          djSocials {
            djInstagramLink
            djSoundcloudLink
            djMixcloudLink
            djYoutubeLink
            djFacebookLink
            djWebsiteLink
          }
        }
      }
    }
  }
`;

export const GET_EVENTS = gql`
  query GetAllEvents {
    skateEvents(first: 50) {
      nodes {
        title
        databaseId
        eventFields {
          eventDate
          eventDjs {
            eventDj {
              edges {
                node {
                  id
                  ... on Dj {
                    djFields {
                      djName
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getEvents(): Promise<SkateEvent[]> {
  const data = await client.request<{ skateEvents: { nodes: SkateEvent[] } }>(GET_EVENTS);
  return data.skateEvents.nodes;
}

export async function getDJs(): Promise<DJ[]> {
  const data = await client.request<{ djs: { nodes: DJ[] } }>(GET_DJS);
  return data.djs.nodes;
}

export interface SkateVideo {
  title: string;
  databaseId: number;
  skateVideo: {
    videoUrl: { url: string };
    videoTitle: string;
    videoSubtitle: string;
    videoYear: string;
  };
  videoCategories: {
    nodes: Array<{ name: string; slug: string }>;
  };
}

export const GET_VIDEOS = gql`
  query GetVideos {
    videos {
      nodes {
        title
        databaseId
        skateVideo {
          videoUrl { url }
          videoTitle
          videoSubtitle
          videoYear
        }
        videoCategories {
          nodes { name slug }
        }
      }
    }
  }
`;

export async function getVideos(): Promise<SkateVideo[]> {
  try {
    const data = await client.request<{ videos: { nodes: SkateVideo[] } }>(GET_VIDEOS);
    return data.videos.nodes;
  } catch {
    return [];
  }
}

export async function getUpcomingEvents(): Promise<Event[]> {
  try {
    const data = await client.request<{ events: { nodes: Event[] } }>(GET_UPCOMING_EVENTS);
    return data.events.nodes;
  } catch {
    return MOCK_EVENTS;
  }
}

const MOCK_EVENTS: Event[] = [
  { id: '1', title: 'Saturday Skate Session', date: '2026-05-23T15:00:00', slug: 'saturday-skate-may-23', eventFields: { djName: 'DJ Rollman', location: 'Skate Circle, Central Park', startTime: '3:00 PM' } },
  { id: '2', title: 'Sunday Skate Session', date: '2026-05-24T14:00:00', slug: 'sunday-skate-may-24', eventFields: { djName: 'DJ Groove', location: 'Skate Circle, Central Park', startTime: '2:00 PM' } },
  { id: '3', title: 'Saturday Skate Session', date: '2026-05-30T15:00:00', slug: 'saturday-skate-may-30', eventFields: { djName: 'DJ Rollman', location: 'Skate Circle, Central Park', startTime: '3:00 PM' } },
  { id: '4', title: 'Sunday Skate Session', date: '2026-05-31T14:00:00', slug: 'sunday-skate-may-31', eventFields: { djName: 'DJ Vibe', location: 'Skate Circle, Central Park', startTime: '2:00 PM' } },
  { id: '5', title: 'Saturday Skate Session', date: '2026-06-06T15:00:00', slug: 'saturday-skate-jun-6', eventFields: { djName: 'DJ Smooth', location: 'Skate Circle, Central Park', startTime: '3:00 PM' } },
  { id: '6', title: 'Sunday Skate Session', date: '2026-06-07T14:00:00', slug: 'sunday-skate-jun-7', eventFields: { djName: 'DJ Rollman', location: 'Skate Circle, Central Park', startTime: '2:00 PM' } },
];
