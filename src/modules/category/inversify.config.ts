import { ContainerModule, interfaces } from "inversify";
import { IDENTIFIER } from "../../common/constants/identifiers";
import { ICategoryRepository } from "./repositories/ICategoryRepository";
import { ICategoryService } from "./services/ICategoryService";
import { CategoryRepository } from "./repositories/CategoryRepository";
import { CategoryService } from "./services/CategoryService";
import { CategoryController } from "./controllers/CategoryController";
import { CategoryRouter } from "./routes/CategoryRoutes";

const CategoryContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<ICategoryRepository>(IDENTIFIER.ICategoryRepository).to(CategoryRepository);
  bind<ICategoryService>(IDENTIFIER.ICategoryService).to(CategoryService);
  bind<CategoryController>(CategoryController).toSelf();
  bind<CategoryRouter>(CategoryRouter).toSelf();
});
export { CategoryContainer };
