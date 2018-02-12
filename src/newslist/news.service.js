import { service } from '../service';

const baseUrl = "https://hacker-news.firebaseio.com/v0";

export const Service = {
  getStories(storyType) {
    return service.get(`${baseUrl}/${storyType}.json`);
  },
  getItem(itemId) {
    return service.get(`${baseUrl}/item/${itemId}.json`);
  }
}