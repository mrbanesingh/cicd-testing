import { Router } from "express";
import { inject, injectable } from "inversify";
import { CategoryController } from "../controllers/CategoryController";
import { JwtValidator } from "../../../middlewares/JwtValidator";

@injectable()
export class CategoryRouter {
  public categoryRouter: Router;

  constructor(@inject(CategoryController) private categoryController: CategoryController) {
    this.categoryRouter = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.categoryRouter.post("/", JwtValidator, this.categoryController.onCreateCategory.bind(this.categoryController));
    this.categoryRouter.get(
      "/:categorycode",
      JwtValidator,
      this.categoryController.onGetCategoryByCode.bind(this.categoryController)
    );
    this.categoryRouter.delete(
      "/:categorycode",
      JwtValidator,
      this.categoryController.onDeleteCategory.bind(this.categoryController)
    );
    this.categoryRouter.put(
      "/:categorycode",
      JwtValidator,
      this.categoryController.onUpdateCategory.bind(this.categoryController)
    );
    this.categoryRouter.get("/", JwtValidator, this.categoryController.onGetCategory.bind(this.categoryController));
  }
}
