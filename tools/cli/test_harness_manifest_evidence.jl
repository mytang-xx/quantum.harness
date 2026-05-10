using Test

include(joinpath(@__DIR__, "harness_manifest_evidence.jl"))

@testset "generic manifest evidence validation" begin
    evidence = Any[
        Dict("id"=>"abs-target", "value"=>0.9999, "expected_abs"=>1.0,
             "tolerance"=>1e-3, "status"=>"pass"),
        Dict("id"=>"signed-target", "value"=>2.01, "expected"=>2.0,
             "tolerance"=>0.02, "status"=>"pass"),
    ]
    @test harness_validate_evidence(evidence; required_ids=["abs-target", "signed-target"])

    bad_value = Any[
        Dict("id"=>"bad", "value"=>0.5, "expected_abs"=>1.0,
             "tolerance"=>1e-3, "status"=>"pass"),
    ]
    @test_throws ErrorException harness_validate_evidence(bad_value)

    bad_status = Any[
        Dict("id"=>"bad-status", "value"=>1.0, "expected_abs"=>1.0,
             "tolerance"=>1e-3, "status"=>"fail"),
    ]
    @test_throws ErrorException harness_validate_evidence(bad_status)

    missing = Any[
        Dict("id"=>"present", "value"=>1.0, "expected_abs"=>1.0,
             "tolerance"=>1e-3, "status"=>"pass"),
    ]
    @test_throws ErrorException harness_validate_evidence(missing; required_ids=["present", "missing"])

    declarations = Any[
        Dict("id"=>"sector", "kind"=>"uniform_pauli_expectation",
             "target"=>"full", "pauli_code"=>3, "expected_abs"=>1.0, "tolerance"=>1e-6),
    ]
    bound = Any[
        Dict("id"=>"sector", "kind"=>"uniform_pauli_expectation",
             "target"=>"full", "pauli_code"=>3, "value"=>0.9999999,
             "expected_abs"=>1.0, "tolerance"=>1e-6, "status"=>"pass"),
    ]
    @test harness_validate_evidence_against_declarations(bound, declarations)

    wrong_binding = Any[
        Dict("id"=>"sector", "kind"=>"uniform_pauli_expectation",
             "target"=>"half", "pauli_code"=>3, "value"=>0.9999999,
             "expected_abs"=>1.0, "tolerance"=>1e-6, "status"=>"pass"),
    ]
    @test_throws ErrorException harness_validate_evidence_against_declarations(wrong_binding, declarations)
end
