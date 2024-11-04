import axios from 'axios';

export class AdvancedSecurity{
  /**  CONFIG  **/ 

  async getWorkspaceConfig(): Promise<void> {
    await axios.get('/workspace');  /// ??? put instead of get?
  }

  /**  WORKSPACE PROFILE **/ 

  async getWorkspaceName(): Promise<void> {
    await axios.get('/workspace/name');
  }

  async updateWorkspaceName(
    newName: string
  ): Promise<void> {
    await axios.put('/workspace/name', {
      newName
    });
  }

  async getWorkspaceIcon(): Promise<void> {
    await axios.get('/workspace/icon');
  }

  async updateWorkspaceIcon(
    newIcon: string
  ): Promise<void> {
    await axios.put('/workspace/icon', {
      newIcon
    });
  }

  async getWorkspaceDetailsCard(): Promise<void> {
    await axios.get('/workspace/details-card');
  }

  async updateWorkspaceDetailsCard(
    newDetailsCard: string
  ): Promise<void> {
    await axios.put('/workspace/details-card', {
      newDetailsCard
    });
  }

  /**  APPEARANCE  **/ 

  async getWorkspaceColor(): Promise<void> {
    return await axios.get('/workspace/accent-color');
  }
  
  async updateWorkspaceColor(
    newColor: string
  ): Promise<void> {
    await axios.put('/workspace/accent-color', {
      newColor
    });
  }
}

export default new CustomizationWorkspace();
