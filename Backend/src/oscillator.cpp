#include "oscillator.hpp"
#include <cmath>

SpringMassOscillator::SpringMassOscillator(double m, double k, double c, double x0, double v0)
    : mass(m), spring_constant(k), damping(c), initial_pos(x0), initial_vel(v0) {}

std::vector<SimulationStep> SpringMassOscillator::simulate(double total_time, double dt) {
    std::vector<SimulationStep> history;
    double t = 0.0;
    double x = initial_pos;
    double v = initial_vel;

    while (t <= total_time) {
        double ke = 0.5 * mass * v * v;
        double pe = 0.5 * spring_constant * x * x;
        
        history.push_back({t, x, v, ke, pe, ke + pe});

        // Numerical Integration (Euler-Cromer / Verlet approximation for stability)
        double acceleration = (-spring_constant * x - damping * v) / mass;
        v += acceleration * dt;
        x += v * dt;
        t += dt;
    }

    return history;
}