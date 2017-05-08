import {Injector, Router, Request} from "typeix";
import {assert, use} from "chai";
import * as sinonChai from "sinon-chai";
import {spy, assert as assertSpy} from "sinon";
import {HomeController} from "../../controllers/home";
import {Assets} from "../../components/assets";
import {TemplateEngine} from "../../components/mu2";

// use chai spies
use(sinonChai);

describe("Home controller", () => {

    let controller: HomeController;
    let assetsMock = {};
    let requestMock = {
        redirectTo: () => {}
    };
    let routerMock = {
        createUrl: () => {}
    };
    let templateMock = {};

    before(() => {
        let injector = Injector.createAndResolve(HomeController, [
            {
                provide: Assets,
                useValue: assetsMock
            },
            {
                provide: Request,
                useValue: requestMock
            },
            {
                provide: Router,
                useValue: routerMock
            },
            {
                provide: TemplateEngine,
                useValue: templateMock
            }
        ]);
        controller = injector.get(HomeController);
    });

    it("Should test redirect action", (done) => {
       let aSpy = spy(requestMock, "redirectTo");
       let bSpy = spy(routerMock, "createUrl");
       controller.redirect().then(() => {
           assertSpy.called(aSpy);
           assertSpy.called(bSpy);
           done();
       }).catch(done);
    });
});
