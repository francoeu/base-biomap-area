export interface User {
    id?: string;
    name?: string | null | undefined;
    email?: string;
    isAdmin?: boolean;
    accessToken?: string;
    refreshToken?: string;
  }
  
  export interface IArchive {
      id: string;
      name: string;
      description: string;
      projectId: string;
      archiveUrl: string;
  }

  export interface IProject {
    id?: string;
    name?: string;
    businessName?: string;
    description?: string;
    imageUrl?: string;
    archives?: IArchive[]
  }
  
