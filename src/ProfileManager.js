import ProfileORM from './ProfileORM';

class _ProfileManager {
  constructor(){
    this.refetchActiveProfile();
  }

  refetchActiveProfile = async () => {
    this.activeProfile = await ProfileORM.getActiveProfile();
    return this.activeProfile;
  }
}

const ProfileManager = new _ProfileManager();
const ActiveProfile = ProfileManager.activeProfile;

export {
  ProfileManager,
  ActiveProfile
};
