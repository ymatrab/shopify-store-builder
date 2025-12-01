import { LlmClient } from '../infra/llm/llmClient';
import { UserInputs } from '../domain/models/userInputs';
import { DiscoveryOutput } from '../domain/models/discoveryTypes';
import { StoreBlueprint } from '../domain/models/storeBlueprint';

export class PlannerAgent {
    constructor(private llmClient: LlmClient) { }

    async run(input: {
        userInputs: UserInputs;
        discovery: DiscoveryOutput;
    }): Promise<StoreBlueprint> {
        const result = await this.llmClient.callPlannerAgent(input);
        return {
            brandStrategy: result.brandStrategy,
            iaPlan: result.iaPlan,
            designLayoutPlan: result.designLayoutPlan,
            copySpec: result.copySpec,
        };
    }
}
