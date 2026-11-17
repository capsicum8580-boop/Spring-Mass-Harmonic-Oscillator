#include <iostream>
#include "oscillator.hpp"

int main() {
    // Parameters: mass = 1.0 kg, spring constant = 20.0 N/m, damping = 0.5, x0 = 1.0m, v0 = 0.0
    SpringMassOscillator oscillator(1.0, 20.0, 0.5, 1.0, 0.0);
    auto results = oscillator.simulate(10.0, 0.05);

    std::cout << "time,displacement,velocity,kinetic_energy,potential_energy,total_energy\n";
    for (const auto& step : results) {
        std::cout << step.time << ","
                  << step.displacement << ","
                  << step.velocity << ","
                  << step.kinetic_energy << ","
                  << step.potential_energy << ","
                  << step.total_energy << "\n";
    }
    return 0;
}