import { TestParameter } from '../../../common/TestParameter';
import { MainPOActions } from '../../../impl/actions/MainPOActions';
import { CommonScenario } from '../../CommonScenario';
import { RepositoryPOChecks } from '../../../impl/checks/RepositoryPOChecks';
import { CheckUtils } from '../../../fwk/utils/CheckUtils';

export class SampleTest extends CommonScenario {

  public static testName: string = 'SampleTest';

  constructor() {
    super('../resources/e2eSanity/sampleTest/SampleTest.json');
  }

   performTest(): void {
    it('Search repository with name/owner from TestParameters', async () => {
      const mainPOActions = new MainPOActions();
      const repositoryPOChecks = new RepositoryPOChecks();
      mainPOActions.searchRepository(TestParameter.getRepName(), TestParameter.getRepOwner());
      expect(await repositoryPOChecks.isSummaryButtonDisplayed()).toBeTruthy(
        'Summary Button is not displayed, repository was not found');
    });
  }

  async checkTestGoals(): Promise<void> {
    expect(await CheckUtils.getPageURL()).toContain(TestParameter.getRepName(), 'Url is wrong');
    expect(await CheckUtils.getPageURL()).toContain(TestParameter.getRepOwner(), 'Url is wrong');
  }

}

new SampleTest().run(SampleTest.testName);
