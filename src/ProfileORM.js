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


export default class ProfileORM {
  constructor(idOrObj){
    this.lastLoaded = null;
    this.lastSaved = null;
    this.db = new PouchDB('profiles');
    if(typeof idOrObj === "string"){
      this._id = idOrObj
      this.load();
    } else {
      Object.assign(this, idOrObj);
    }
  }

  load = async (opts) => {
    const profileDoc = await this.db.get(this._id, opts);
    Object.assign(this, profileDoc);
    this.lastLoaded = Date.now();
  }

  save = async () => {
    const now = Date.now();
    const profileDoc = {
      _id: this._id || this.wallet.address,
      lastModifiedAt: now
    }

    Object.keys(schema).forEach((key)=>{
      profileDoc[key] = this[key];
    })

    const response = await this.db.put(profileDoc);
    if(response.ok){
      this.lastSaved = now
      this._rev = response.rev;
    }
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
