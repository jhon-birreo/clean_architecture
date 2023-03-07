import { UuidRepository } from 'feature/shared/domain/repositories/uuidRepository';
import { v4 } from 'uuid';

export class UuidV4Generator implements UuidRepository {
	verify(): string {
		return 'verify';
	}
	ramdom(): string {
		return v4();
	}
}
