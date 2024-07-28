import { Action, Interceptor, InterceptorInterface } from "routing-controllers";
import { Service } from "typedi";
import { PaginatedDto } from "../dtos/paginated.dto";
import { PageMetadataDto } from "../dtos/page-metadata.dto";

@Service()
@Interceptor()
export class PaginationInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    if (content && Array.isArray(content.data)) {
      const response = new PaginatedDto(content.data, content.data.length);
      response.status = action.response.statusCode;
      response.message = "Success";

      const metadata = new PageMetadataDto(content.data.length);
      
      if (content.meta) {
        metadata.setPaginationData(
          content.meta.pageNumber,
          content.meta.pageSize
        );
        metadata.sortBy = content.meta.sortBy;
      }
      response.metadata = metadata;

      return response;
    }
    return content;
  }
}
