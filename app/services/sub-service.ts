import baseUrl from "./api-client";

export interface Subscriber {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: { city: string };
  company: { name: string };
}

class SubService {
  async getAllSubs(): Promise<Subscriber[]> {
    const res = await fetch(baseUrl + "/users");
    const subs = await res.json();
    return subs;
  }

  async deleteSub(id: number): Promise<void> {
    try {
      const res = await fetch(baseUrl + `/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete subscriber. Status: ${res.status}`);
      }
    } catch (err) {
      throw new Error(`${(err as Error).message}`);
    }
  }

  async updateSub(subscriber: Subscriber): Promise<void> {
    try {
      const res = await fetch(baseUrl + "/users/" + subscriber.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscriber),
      });

      if (!res.ok) {
        throw new Error(`Failed to update subscriber. Status: ${res.status}`);
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}

export default new SubService();
