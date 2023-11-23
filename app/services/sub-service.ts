import baseUrl from "./api-client";

export interface Subscriber {
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
  phone: string;
}

class SubService {
  async getAllSubs(): Promise<Subscriber[]> {
    const res = await fetch(baseUrl + "/users");
    return res.json();
  }
}

export default new SubService();
