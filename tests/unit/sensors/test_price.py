"""Test price sensors."""

from datetime import datetime
from unittest.mock import Mock

import pytest
from homeassistant.components.sensor import SensorStateClass

from custom_components.fortum.device import FortumDevice
from custom_components.fortum.models import SpotPricePoint
from custom_components.fortum.sensors.price import FortumPriceSensor


@pytest.fixture
def mock_coordinator():
    """Create a mock coordinator."""
    coordinator = Mock()
    coordinator.data = [
        SpotPricePoint(
            date_time=datetime(2026, 3, 10, 12, 0, 0),
            price=0.119,
            price_unit="EUR/kWh",
            area_code="FI",
        ),
        SpotPricePoint(
            date_time=datetime(2026, 3, 11, 12, 0, 0),
            price=0.125,
            price_unit="EUR/kWh",
            area_code="FI",
        ),
    ]
    coordinator.last_update_success = True
    return coordinator


@pytest.fixture
def mock_device():
    """Create a mock device."""
    device = Mock(spec=FortumDevice)
    device.device_info = {
        "identifiers": {("fortum", "123456")},
        "name": "Fortum Energy Meter",
        "manufacturer": "Fortum",
        "model": "Energy Meter",
    }
    return device


class TestFortumPriceSensor:
    """Test Fortum price sensor."""

    @pytest.fixture
    def sensor(self, mock_coordinator, mock_device):
        """Create price sensor."""
        return FortumPriceSensor(
            coordinator=mock_coordinator,
            device=mock_device,
            region="fi",
            area_code="FI",
        )

    def test_sensor_properties(self, sensor):
        """Test sensor properties."""
        assert sensor.name == "Price per kWh [FI]"
        assert sensor.state_class == SensorStateClass.MEASUREMENT
        assert sensor.native_unit_of_measurement == "EUR/kWh"

    def test_native_value_returns_latest_price(self, sensor):
        """Test latest price is used as native value."""
        assert sensor.native_value == 0.125

    def test_native_value_no_price_data(self, sensor, mock_coordinator):
        """Test sensor value when no price is available."""
        mock_coordinator.data = []
        assert sensor.native_value is None
        assert sensor.available is False

    def test_fallback_unit_uses_region_currency(self, mock_coordinator, mock_device):
        """Test fallback unit when API does not provide price unit."""
        mock_coordinator.data = [
            SpotPricePoint(
                date_time=datetime.now(),
                price=0.1,
                price_unit=None,
                area_code="SE3",
            )
        ]
        sensor = FortumPriceSensor(
            coordinator=mock_coordinator,
            device=mock_device,
            region="se",
            area_code="SE3",
        )

        assert sensor.native_unit_of_measurement == "SEK/kWh"

    def test_extra_state_attributes_split_average_price(
        self, sensor, mock_coordinator
    ):
        """Test split_average_price attribute is exposed."""
        config_entry = Mock()
        config_entry.options = {"split_average_price": True}
        mock_coordinator.config_entry = config_entry

        attrs = sensor.extra_state_attributes
        assert attrs["split_average_price"] is True

        config_entry.options = {"split_average_price": False}
        attrs = sensor.extra_state_attributes
        assert attrs["split_average_price"] is False

    def test_extra_state_attributes_forecast(self, sensor, mock_coordinator):
        """Test forecast attribute is exposed and matches price points."""
        config_entry = Mock()
        config_entry.options = {"split_average_price": False}
        mock_coordinator.config_entry = config_entry

        attrs = sensor.extra_state_attributes
        assert attrs is not None
        forecast = attrs["forecast"]
        assert len(forecast) == 2
        assert forecast[0] == {
            "date_time": "2026-03-10T12:00:00",
            "price": 0.119,
        }
        assert forecast[1] == {
            "date_time": "2026-03-11T12:00:00",
            "price": 0.125,
        }
