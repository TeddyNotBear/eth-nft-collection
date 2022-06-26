require('dotenv').config()
const GNOSIS_SAFE = process.env.GNOSIS_SAFE;

async function main() {
    console.log("Transferring ownership of ProxyAdmin...");
    // The owner of the ProxyAdmin can upgrade our contracts
    await upgrades.admin.transferProxyAdminOwnership(GNOSIS_SAFE);
    console.log("Transferred ownership of ProxyAdmin to:", GNOSIS_SAFE);
}
   
main();