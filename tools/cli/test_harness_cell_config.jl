using Test

include(joinpath(@__DIR__, "harness_cell_config.jl"))

@testset "generic run-spec cell settings" begin
    spec = Dict{String,Any}(
        "settings" => Dict{String,Any}(
            "sampler" => "exact",
            "budget" => 10,
            "nested" => Dict{String,Any}("mode" => "strict"),
        ),
        "cells" => Any[
            Dict{String,Any}(
                "cell_id" => "cell-0001",
                "params" => Dict{String,Any}("axis" => 1),
            ),
            Dict{String,Any}(
                "cell_id" => "cell-0002",
                "params" => Dict{String,Any}("axis" => 2),
                "settings" => Dict{String,Any}("budget" => 20),
            ),
        ],
    )

    expected = harness_expected_cell_settings(spec)
    @test expected["cell-0001"]["sampler"] == "exact"
    @test expected["cell-0001"]["budget"] == 10
    @test expected["cell-0002"]["sampler"] == "exact"
    @test expected["cell-0002"]["budget"] == 20

    manifests = Any[
        Dict{String,Any}(
            "cell_id" => "cell-0001",
            "params" => Dict{String,Any}("axis" => 1),
            "settings" => Dict{String,Any}(
                "sampler" => "exact",
                "budget" => 10,
                "nested" => Dict{String,Any}("mode" => "strict"),
            ),
        ),
        Dict{String,Any}(
            "cell_id" => "cell-0002",
            "params" => Dict{String,Any}("axis" => 2),
            "settings" => Dict{String,Any}(
                "sampler" => "exact",
                "budget" => 20,
                "nested" => Dict{String,Any}("mode" => "strict"),
            ),
        ),
    ]

    @test harness_validate_manifest_settings(manifests[1], expected["cell-0001"]; path="cell-0001")
    @test harness_validate_manifest_settings(manifests[2], expected["cell-0002"]; path="cell-0002")

    summary = harness_summarize_manifest_settings(manifests)
    @test summary["constant"]["sampler"] == "exact"
    @test summary["constant"]["nested"] == Dict{String,Any}("mode" => "strict")
    @test !haskey(summary["constant"], "budget")
    @test length(summary["varying"]["budget"]) == 2
    @test summary["varying"]["budget"][1]["value"] == 10
    @test summary["varying"]["budget"][2]["value"] == 20

    bad = deepcopy(manifests[2])
    bad["settings"]["budget"] = 30
    @test_throws ErrorException harness_validate_manifest_settings(bad, expected["cell-0002"]; path="bad")

    symbol_key_manifests = Any[
        Dict{String,Any}(
            "cell_id" => "cell-a",
            "params" => Dict{String,Any}("axis" => 1),
            "settings" => Dict(:budget => 10),
        ),
        Dict{String,Any}(
            "cell_id" => "cell-b",
            "params" => Dict{String,Any}("axis" => 2),
            "settings" => Dict(:budget => 20),
        ),
    ]
    symbol_summary = harness_summarize_manifest_settings(symbol_key_manifests)
    @test !haskey(symbol_summary["constant"], "budget")
    @test length(symbol_summary["varying"]["budget"]) == 2
    @test symbol_summary["varying"]["budget"][1]["value"] == 10
    @test symbol_summary["varying"]["budget"][2]["value"] == 20
end
