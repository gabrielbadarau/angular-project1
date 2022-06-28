import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { DateService } from './date.service';

describe('DateService', () => {
    let spectator: SpectatorService<DateService>;
    const createService = createServiceFactory(DateService);

    beforeEach(() => spectator = createService());

    it('Get last 7 dates', () => {
        expect(spectator.service.getLast7Dates(27).length).toBe(7);
    });

    it('Get last 4 weeks', () => {
        const last4Weeks = spectator.service.getLast4Weeks(27)
        expect(last4Weeks.length).toBe(4);
    })

    it('Get last 12 month to display', () => {
        expect(spectator.service.getLast12MonthsToDisplay().length).toBe(12);
    })

    it('Transform Dates To Strings', () => {
        let date1 = new Date(2022, 2, 2)
        let date2 = new Date(2022, 10, 10)

        let transformedData = spectator.service.transformDatesToStrings([date1, date2]);
        let checkIfDataIsNotString = transformedData.some(data => typeof data !== 'string')
        expect(checkIfDataIsNotString).toBe(false);
    })

    it("Transform String To Date", () => {
        const date = "02.07.2022";
        expect(spectator.service.transformStringToDate(date) instanceof Date).toBe(true);
    })

    it("Format 4 weeks to display", () => {
        const FourWeeks = [
            [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
            [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
            [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
            [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()]
        ]
        const formated4weeks = spectator.service.format4WeeksToDisplay(FourWeeks);
        expect(formated4weeks.length).toBe(4);
        expect(formated4weeks.some(date => typeof date !== 'string')).toBe(false)
    })

    it("Format 7 Dates To Display", () => {
        const dates = [new Date(), new Date(), new Date(), new Date()];
        const transformedDates = spectator.service.format7DatesToDisplay(dates);
        expect(transformedDates.some(date => typeof date !== 'string')).toBe(false);
    })
});