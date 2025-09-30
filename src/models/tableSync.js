
import news from './news';
import adminUser from './adminUser';
import FAQ from './faq';
import DealerContactForm from './contactRequest';
import Contact from './contact';
import Favorite from './favourites';
import zohoCredentials from './zohoCredentials';
import ZohoDealer from './zohoDealer';
import ZohoDealerContactRequest from './zohoContactRequests';
import Charts from './chart';
import brandLogo from './brandLogo';
import LanguageSetting from './languageSetting';
import chartCategoryName from './chartCategoryName';
import clientZohoForm from './clientZohoForm';
import clientDealForm from './clientDealForm';
import UpdateSchedule from './ftpUpdateSchedule';
import databasesTables from './databasesTables';
import databaseLogs from './databaseLogs';







(async () => {
  // await news.sync({ force: false, alter:true });
    await news.sync({ force: false });
    await adminUser.sync({ force: false});
    await FAQ.sync({ force: false });
    await DealerContactForm.sync({ force: false});
    await Contact.sync({ force: false});
    await Favorite.sync({ force: false});
    await zohoCredentials.sync({ force: false});
    await ZohoDealer.sync({ force: false});
    await ZohoDealerContactRequest.sync({ force: false });
    await Charts.sync({ force: false });
    await brandLogo.sync({ force: false });
    await LanguageSetting.sync({ force: false});
    await chartCategoryName.sync({ force: false});
    await clientZohoForm.sync({ force: false});
    await clientDealForm.sync({ force: false});
    await UpdateSchedule.sync({ force: false});
    await databasesTables.sync({ force: false});
    await databaseLogs.sync({ force: false});
  })();
  