import { TestBed } from '@angular/core/testing';

import { TimeService } from './time.service';
import * as moment from 'moment-timezone';
import { CITIES, TIME_ZONES } from '../../constants/timezones';

describe('TimeService', () => {
  let service: TimeService;
  const date = '2020-03-29T03:00:00';

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(TimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('[Calculation of UTC offset]', () => {
    it('should calculate offset for ukrainian cities', () => {
      const dateBeforeDST = '2020-03-14T02:59:59';
      const dateAfterDST = '2020-03-29T03:00:00';
      const offsetWithoutDST = service.getUTCOffset(CITIES.KIEV, dateBeforeDST);
      const offsetWithDST = service.getUTCOffset(CITIES.KIEV, dateAfterDST);

      expect(offsetWithoutDST).toBe(2);
      expect(offsetWithDST).toBe(3);
    });

    it('should calculate offset for belarusian cities', () => {
      const offset = service.getUTCOffset(CITIES.MINSK, date);

      expect(offset).toBe(3);
    });

    it('should calculate offset for russian cities', () => {
      const penzaOffset = service.getUTCOffset(CITIES.PENZA, date);
      const kaliningradOffset = service.getUTCOffset(CITIES.KALININGRAD, date);

      expect(penzaOffset).toBe(3);
      expect(kaliningradOffset).toBe(2);
    });
  });

  describe('[Getting zone name]', () => {
    it('should return a zone name', () => {
      const ukrainianCities = [CITIES.KIEV, CITIES.DNIPRO, CITIES.KHARKIV, CITIES.CHERKASY, CITIES.CHERNIHIV, CITIES.ODESSA];
      const ukrainianZones = Array.from({length: 6}, () => TIME_ZONES.KIEV);
      const russianCities = [CITIES.KALININGRAD, CITIES.PENZA, CITIES.SAINT_PETERSBURG, CITIES.KAZAN];
      const russianZones = [TIME_ZONES.KALININGRAD, TIME_ZONES.MOSCOW, TIME_ZONES.MOSCOW, TIME_ZONES.MOSCOW];
      const belarusianCities = [CITIES.MINSK, CITIES.VITEBSK_LAB, CITIES.VITEBSK, CITIES.POLOTSK, CITIES.MOZYR, CITIES.GOMEL];
      const belarusianZones = Array.from({length: 6}, () => TIME_ZONES.MINSK);

      expect(ukrainianCities.map(service.getTimeZoneName)).toEqual(ukrainianZones);
      expect(russianCities.map(service.getTimeZoneName)).toEqual(russianZones);
      expect(belarusianCities.map(service.getTimeZoneName)).toEqual(belarusianZones);
    });

    it('should throw if zone not found', () => {
      expect(() => service.getTimeZoneName('Moscow')).toThrow();
      expect(() => service.getTimeZoneName('')).toThrow();
    });
  });

  describe('[Getting date with timezone]', () => {
    it('should return a timezone date', () => {
      const testDataSet = ['2020-02-29T09:00:00', '2020-03-29T02:59:59', '2020-03-29T04:00:00'];

      const testDataSetUkraine = testDataSet
        .map(testDate => service.getTimezoneDate(testDate, TIME_ZONES.KIEV).format());
      const expectedDataSetUkraine = testDataSet
        .map(expectedDate => moment.utc(expectedDate).tz(TIME_ZONES.KIEV).format());

      expect(testDataSetUkraine)
        .toEqual(expectedDataSetUkraine);
    });
  });
});
