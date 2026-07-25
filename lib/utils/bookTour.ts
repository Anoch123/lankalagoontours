import { Passenger } from "@/lib/types/tour_booking";

export const emptyPassenger = (): Passenger => ({ firstName: "", lastName: "", country: "" });

export function getMonthGrid(year: number, month: number) {
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = Array(startOffset).fill(null);

    for (let day = 1; day <= daysInMonth; day += 1) {
        cells.push(day);
    }

    while (cells.length % 7 !== 0) {
        cells.push(null);
    }

    return cells;
}

export function formatTimeSlots(departures?: string) {
    if (!departures) return [];

    return departures
        .replace("daily", "")
        .split("&")
        .map((time) => {
            const [hour, minute] = time.trim().split(":");
            const date = new Date();
            date.setHours(Number(hour));
            date.setMinutes(Number(minute));

            return date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
            });
        });
}

export function isPastDay(day: number, viewYear: number, viewMonth: number, today: Date) {
    const currentDay = new Date(viewYear, viewMonth, day);
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return currentDay < startOfToday;
}

export function getNextMonth(viewYear: number, viewMonth: number, dir: 1 | -1) {
    let month = viewMonth + dir;
    let year = viewYear;

    if (month < 0) {
        month = 11;
        year -= 1;
    }

    if (month > 11) {
        month = 0;
        year += 1;
    }

    return { viewYear: year, viewMonth: month };
}
