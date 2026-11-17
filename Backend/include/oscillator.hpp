#ifndef OSCILLATOR_HPP
#define OSCILLATOR_HPP

#include <vector>

struct SimulationStep {
    double time;
    double displacement;
    double velocity;
    double kinetic_energy;
    double potential_energy;
    double total_energy;
};

class SpringMassOscillator {
private:
    double mass;           // m (kg)
    double spring_constant;// k (N/m)
    double damping;        // c (Ns/m)
    double initial_pos;    // x0 (m)
    double initial_vel;    // v0 (m/s)

public:
    SpringMassOscillator(double m, double k, double c, double x0, double v0);
    
    // Generates simulation time-series data using Runge-Kutta or Euler integration
    std::vector<SimulationStep> simulate(double total_time, double dt);
};

#endif