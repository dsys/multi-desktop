import PouchDB from 'pouchdb-browser';

const schema = {
  name: "",
  coverCSS: "",
  wallet: {
    privateKey: "",
    publicKey: "",
    address: ""
  }
}

const metadataDocID = 'metadata';

export default class ProfileORM {
  constructor(idOrObj){
    this.db = new PouchDB('profiles');
    if(typeof idOrObj === "string"){
      this._id = idOrObj
    } else {
      Object.assign(this, idOrObj);
    }
  }

  static async getActiveProfile(){
    const metadataDoc = await ProfileORM.getMetadataDoc();
    const activeProfileID = metadataDoc.activeProfileID;
    if(!activeProfileID) return null;
    const activeProfile = new ProfileORM(activeProfileID);
    await activeProfile.load()
    return activeProfile
  }

  static async getMetadataDoc(){
    const db = new PouchDB('profiles');
    let metadataDoc = null
    try{
      metadataDoc = await db.get(metadataDocID);
    } catch (e){
      if(e.status === 404){
        metadataDoc = {"_id":metadataDocID}
        await db.put(metadataDoc);
        metadataDoc = await db.get(metadataDocID)
      }
    }
    return metadataDoc;
  }

  static getDB(){
    return new PouchDB('profiles');
  }

  load = async (opts={}) => {
    const profileDoc = await this.db.get(this._id, opts);
    Object.assign(this, profileDoc);
  }

  save = async () => {
    const now = Date.now();
    if(!this._id) this._id = this.wallet.address;
    const profileDoc = {
      _id: this._id,
      lastModifiedAt: now
    }

    Object.keys(schema).forEach((key)=>{
      profileDoc[key] = this[key];
    })

    const response = await this.db.put(profileDoc);
    await this.load();
  }

  setAsActiveProfile = async () => {
    let metadataDoc = await ProfileORM.getMetadataDoc();
    metadataDoc['activeProfileID'] = this._id;

    return this.db.put(metadataDoc);
  }

  getProfileImgURL = async () => {
    const profileImgBlob = await this.db.getAttachment(this._id, "profileImg");
    return URL.createObjectURL(profileImgBlob);
  }

  putProfileImg = async (blob) => {
    const result = await this.db.putAttachment(this._id, "profileImg", blob, blob.type);
    return result;
  }
}
