
import news from './news.js';
import adminUser from './adminUser.js';
import FAQ from './faq.js';
import DealerContactForm from './contactRequest.js';
import Contact from './contact.js';
import Favorite from './favourites.js';
import zohoCredentials from './zohoCredentials.js';
import ZohoDealer from './zohoDealer.js';
import ZohoDealerContactRequest from './zohoContactRequests.js';
import Charts from './chart.js';
import brandLogo from './brandLogo.js';
import LanguageSetting from './languageSetting.js';
import chartCategoryName from './chartCategoryName.js';
import clientZohoForm from './clientZohoForm.js';
import clientDealForm from './clientDealForm.js';
import UpdateSchedule from './ftpUpdateSchedule.js';
import databasesTables from './databasesTables.js';
import databaseLogs from './databaseLogs.js';







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
  