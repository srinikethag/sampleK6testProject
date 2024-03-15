import { sleep } from 'k6';
import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

export const options = {
    vus: __ENV.VUS_PATEINTS_PAGE_TEST,
    duration: __ENV.DURATION_TASKS_PAGE_TEST
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
    'stdout': textSummary(data, {indent: ' ', enableColors: true}),
  };
}


