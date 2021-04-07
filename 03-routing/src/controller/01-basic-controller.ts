import { route } from "@plumier/core";

/**
 * Basic route generation.
 * 
 * Rout by default generated based on controller name, action name, and action parameter names
 */

export class RoutingController {

    /**
     * Default Route
     * 
     * By default when no parameter provided generated into /controller/action?param&param&param
     * 
     * Generated into:
     * GET /routing/simple?par1=lorem&par2=1234
     */
    @route.get()
    simple(par1: string, par2: number) {
        return {}
    }

    /**
     * Action Override
     * 
     * When parameter provided, action name changed with the parameter provided
     * 
     * Generated into:
     * GET /routing/action/override?par1=lorem&par2=1234
     */
    @route.get("action/override")
    actionOvr(par1: string, par2: number) {
        return {}
    }

    /**
     * Action Override With Parameter
     * 
     * Route parameter (start with :) can be provided 
     * 
     * Generated into:
     * GET /routing/action/:id/override?par1=lorem&par2=1234
     */
    @route.get("action/:id/override")
    actionOvrPar(id: string, par1: string, par2: number) {
        return {}
    }

    /**
     * Absolute Route
     * 
     * When start with slash (/) controller name (all preceding path) will be ignored
     * 
     * Generated into:
     * GET /absolute/route?par1=lorem&par2=1234
     */
    @route.get("/absolute/route")
    absolute(par1: string, par2: number) {
        return {}
    }


    /**
     * Ignore action name
     * 
     * When provided empty string, action name will be ignored
     * 
     * Generated into:
     * GET /routing?par1=lorem&par2=1234
     */
    @route.get("")
    noName(par1: string, par2: number) {
        return {}
    }

    /**
    * Multiple Routes
    * 
    * When provided empty string, action name will be ignored
    * 
    * Generated into:
    * GET /routing/multiple/one?par1=lorem&par2=1234
    * GET /routing/multiple/two?par1=lorem&par2=1234
    */
    @route.get("multiple/one")
    @route.get("multiple/two")
    multiple(par1: string, par2: number) {
        return {}
    }
}