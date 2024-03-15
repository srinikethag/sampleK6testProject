import { sleep } from 'k6';
import http from 'k6/http';

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
