import { Photo } from "./photo";

export interface Member {
  id: number;
  username: string;
  dateOfBirth: Date;
  age: number;
  createdAt: Date;
  lastActive: Date;
  knownAs: string;
  gender: string;
  photoUrl: string;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
  photos: Photo[];
}
