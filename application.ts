import {Module, Logger, Inject, IAfterConstruct, Router, Methods, LogLevels} from "typeix";
import {Assets} from "./components/assets";
import {CoreController} from "./controllers/core";
import {HomeController} from "./controllers/home";
import {AdminModule} from "./modules/admin/admin.module";
import {TemplateEngine} from "./components/mu2";
import {InMemoryCache} from "./components/in-memory-cache";
/**
 * Application entry point
 * @constructor
 * @function
 * @name Application
 *
 * @description
 * \@Module is used to define application entry point class
 */
@Module({
  imports: [AdminModule], // bootstrap in recursive top level order
  controllers: [HomeController, CoreController], // no order
  providers: [Logger, Router, Assets, TemplateEngine, InMemoryCache] // in order processed
})
export class Application implements IAfterConstruct {

  /**
   * @param {Assets} assetLoader
   * @description
   * Custom asset loader service
   */
  @Inject(Assets)
  assetLoader: Assets;

  /**
   * @param {Logger} logger
   * @description
   * Logger service
   */
  @Inject(Logger)
  logger: Logger;

  /**
   * @param {Router} router
   * @description
   * Router service
   */
  @Inject(Router)
  router: Router;

  /**
   * @function
   * @name Application#afterConstruct
   *
   * @description
   * After construct use injected values to define some behavior at entry point
   * Defining main route, all routes are processed
   */
  afterConstruct() {

    this.logger.enable();
    this.logger.printToConsole();
    this.logger.setDebugLevel(LogLevels.BENCHMARK);
    this.logger.info("Application.arg", this.assetLoader);

    this.router.addRules([
      {
        methods: [Methods.GET],
        route: "core/favicon",
        url: "/favicon.ico"
      },
      {
        methods: [Methods.GET],
        route: "core/assets",
        url: "/assets/<file:(.*)>"
      },
      {
        methods: [Methods.GET],
        route: "home/id",
        url: "/<id:(\\d+)>/<name:(\\w+)>"
      },
      {
        methods: [Methods.GET],
        route: "home/id",
        url: "/<id:(\\d+)>"
      },
      {
        methods: [Methods.GET],
        route: "home/index",
        url: "/"
      },
      {
        methods: [Methods.GET],
        route: "home/redirect",
        url: "/redirect-to-home"
      },
      {
        methods: [Methods.GET],
        route: "core/error",
        url: "/throw-error"
      }
    ]);


    this.router.setError("core/error");
  }
}
