import rethinkdbdash from "rethinkdbdash"
import config from "../server/config/config"

const r = rethinkdbdash(config.db)

// REJESTR - ODCZYT


// LOKALE
// r.tableCreate('lokale').run()
// r.tableDrop('lokale').run()
// -------- Create/drop-create before insert
// import dom from './dom'
// r.table('lokale').insert(dom.lokale).run()

// import konfiguracja from './konfiguracja'
// r.table('konfig').insert(konfiguracja.konfig).run()
// r.table('konfigTemp').insert(konfiguracja.konfigTemp).run()

// REJESTRY
// r.tableCreate('rejestrOpis').run()
// r.tableDrop('rejestrOpis').run()
// -------- Create/drop-create before insert
// import rejestrOpis from './rejestrOpis'
// r.table('rejestrOpis').insert(rejestrOpis).run()

// Odczyty
// r.tableCreate('wyjscia')
// r.tableCreate('wy_satel')
// r.tableCreate('wy_temp')

// stare...
// r.tableCreate('') ; r.tableDrop('')
// r.table('rejWy').insert(rej.rejWy).run();
// r.table('rejSter').insert(rej.rejSter).run();
// r.table('rejWyTemp').insert(rej.rejWyTemp).run();
// r.table('rejSterTemp').insert(rej.rejSterTemp).run();
//
// r.table('swiatla').insert(rej.swiatla).run();
// r.table('grzanie').insert(rej.grzanie).run();
// r.table('satel').insert(rej.satel).run();
// r.table('tech').insert(rej.tech).run();
