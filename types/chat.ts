export interface Chat {
  _id: string;
  title: string;
  members: string[];
  data: {
    members: {
      _id: string;
      profile: {
        firstName: string;
        lastName: string;
        avatar?: {
          secureUrl?: string;
        };
      };
    }[];
    messages: {
      data: {
        _id: string;
        createdAt: string;
        rawText?: string;
        ts: number;
      }[];
    };
  };
  createdAt: string;
}
