import { Expose } from "class-transformer";
import { PageMetadataDto } from "./page-metadata.dto";

export class PaginatedDto<T> {
  @Expose()
  status: number;

  @Expose()
  message: string;

  @Expose()
  data: T[];

  @Expose()
  metadata: PageMetadataDto;

  constructor(data: T[], count: number) {
    this.data = data;
    this.metadata = new PageMetadataDto(count);
  }
}
