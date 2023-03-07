export interface UuidRepository {
  ramdom: () => string;
  verify: () => string;
}