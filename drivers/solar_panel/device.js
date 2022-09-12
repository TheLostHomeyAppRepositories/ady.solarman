/* jslint node: true */

'use strict';

const LanDevice = require('../lan_device');

class SolarPanelDevice extends LanDevice
{
    /**
     * onInit is called when the device is initialized.
     */
    async onInit()
    {
        await super.onInit();

        this.log('SolarPanelDevice has been initialized');
    }

    async onSettings({ oldSettings, newSettings, changedKeys })
    {
    }

    async updateLanDeviceValues(serial, data)
    {
        try
        {
            const dd = this.getData();

            if (serial === dd.id)
            {
                this.setAvailable();

                this.setCapabilityValue('measure_power', data.PV_Power).catch(this.error);
                this.setCapabilityValue('meter_power.today', data.Daily_Production).catch(this.error);
                this.setCapabilityValue('meter_power', data.Total_Generation).catch(this.error);
            }
        }
        catch (err)
        {
            this.homey.app.updateLog(`updateLanDeviceValues: : ${this.homey.app.varToString(err)}`);
            this.setUnavailable(err.message);
        }
    }
}

module.exports = SolarPanelDevice;
