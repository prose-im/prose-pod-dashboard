import axios from 'axios';

class TeamMembers {
  /**  INVITATIONS  **/ 

  async getAllInvitations(): Promise<void> {
    // Attempt connecting (this might fail, eg. wrong credentials)
    await axios.get('/invitations');
  }

  async sendInvitation(
    email: string
  ): Promise<void> {
    // Attempt connecting (this might fail, eg. wrong credentials)
    await axios.post('/invitations', {
      email
    });
  }

  async resendInvitation(
    invitationId: string
  ): Promise<void> {
    // Attempt connecting (this might fail, eg. wrong credentials)
    await axios.post(`/invitations/${invitationId}/resend`);

  }

  async cancelInvitation(
    invitationId: string
  ): Promise<void> {
    await axios.delete(`/invitations/${invitationId}`);
  }

  /**  MEMBERS  **/ 

  async getAllMembers(): Promise<void> {
    await axios.get('/members');
  }

  async getMemberById(
    memberId: number
  ): Promise<void> {
    await axios.get(`/members/${memberId}`);
  }  

  async updateMemberMfa(
    memberId: number,
    mfa: boolean
  ): Promise<void> {
    await axios.put(`/members/${memberId}/mfa`, {
      mfa
    });
  }  

  async updateMemberRole(
    memberId: number,
    role: string
  ): Promise<void> {
    await axios.put(`/members/${memberId}/role`, {
      role
    });
  }  
}

export default new TeamMembers();