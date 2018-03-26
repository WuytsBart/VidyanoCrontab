using System.Data.Entity;

namespace VidyanoCrontab.Service
{
    public class CrontabEntityModelContainer : DbContext
    {
        public CrontabEntityModelContainer()
        {
            Database.SetInitializer<CrontabEntityModelContainer>(null);
        }
    }
}