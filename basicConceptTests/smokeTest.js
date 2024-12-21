import { sleep } from 'k6';
import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: __ENV.VUS_TEST,
    duration: __ENV.DURATION_TEST
}

export default function() {
    http.get("https://test.k6.io");
    sleep(1);
    http.get("https://test.k6.io/contacts.php");
    sleep(2);
    http.get("https://test.k6.io/news.php");
    sleep(2);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}


