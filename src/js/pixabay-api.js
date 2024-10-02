import axios from 'axios';
import { MESSAGES, MESSAGES_BG_COLORS, showInfoMessage } from './helpers.js';
import { fetchLoader } from './render-functions.js';

const API_KEY = '46188258-c5cd36c908765f14e73be3753';
const API_URL = 'https://pixabay.com/api/?';
const CONFIG = {
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientations: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 15,
  },
};

export async function getGalleryData(queryValue, page) {
  try {
    fetchLoader();
    CONFIG.params.q = queryValue;
    CONFIG.params.page = page;
    const response = await axios.get(API_URL, CONFIG);
    return response.data;
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      showInfoMessage(
        `${MESSAGES.exception} ERROR: ${data}`,
        MESSAGES_BG_COLORS.orange
      );
    } else if (error.request) {
      showInfoMessage(
        `${MESSAGES.exception} ERROR: ${error.request}`,
        MESSAGES_BG_COLORS.orange
      );
    } else {
      showInfoMessage(
        `${MESSAGES.exception} ERROR: ${error.message}`,
        MESSAGES_BG_COLORS.orange
      );
    }
  }
}