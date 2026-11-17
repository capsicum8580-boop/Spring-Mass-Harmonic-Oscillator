cmake_minimum_required(VERSION 3.10)
project(SpringMassBackend)

set(CMAKE_CXX_STANDARD 17)

include_directories(include)
add_executable(oscillator_sim src/main.cpp src/oscillator.cpp)