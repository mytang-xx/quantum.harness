function harness_evidence_float(x, label::AbstractString)
    x isa Bool && error("Expected numeric value for $label, got boolean $(repr(x))")
    x isa Real && return Float64(x)
    return parse(Float64, string(x))
end

function harness_evidence_expected(item::AbstractDict)
    haskey(item, "expected_abs") && return (:expected_abs, harness_evidence_float(item["expected_abs"], "expected_abs"))
    haskey(item, "expected") && return (:expected, harness_evidence_float(item["expected"], "expected"))
    error("Evidence item '$(get(item, "id", "<unnamed>"))' must declare expected or expected_abs")
end

function harness_evidence_diff(item::AbstractDict)
    id = string(get(item, "id", "<unnamed>"))
    value = harness_evidence_float(item["value"], "$id.value")
    tolerance = harness_evidence_float(item["tolerance"], "$id.tolerance")
    isfinite(value) || error("Evidence item '$id' value is not finite")
    isfinite(tolerance) && tolerance >= 0 || error("Evidence item '$id' tolerance must be finite and non-negative")
    mode, expected = harness_evidence_expected(item)
    isfinite(expected) || error("Evidence item '$id' expected value is not finite")
    return mode == :expected_abs ? abs(abs(value) - expected) : abs(value - expected)
end

function harness_evidence_computed_status(item::AbstractDict)
    diff = harness_evidence_diff(item)
    tolerance = harness_evidence_float(item["tolerance"], "$(get(item, "id", "<unnamed>")).tolerance")
    return diff <= tolerance ? "pass" : "fail"
end

function harness_validate_evidence_item(item::AbstractDict)
    id = string(get(item, "id", "<unnamed>"))
    diff = harness_evidence_diff(item)
    tolerance = harness_evidence_float(item["tolerance"], "$id.tolerance")
    computed = diff <= tolerance ? "pass" : "fail"
    declared = lowercase(string(get(item, "status", "")))
    declared == computed ||
        error("Evidence item '$id' declares status='$declared' but computed status='$computed' (diff=$diff tolerance=$tolerance)")
    computed == "pass" ||
        error("Evidence item '$id' failed (diff=$diff tolerance=$tolerance)")
    return true
end

function harness_validate_evidence(evidence; required_ids=String[])
    evidence isa AbstractVector || error("Evidence must be a list")
    ids = Set{String}()
    for item in evidence
        item isa AbstractDict || error("Every evidence item must be an object")
        haskey(item, "id") || error("Every evidence item must have an id")
        id = string(item["id"])
        id in ids && error("Duplicate evidence id '$id'")
        push!(ids, id)
        harness_validate_evidence_item(item)
    end
    for id in required_ids
        string(id) in ids || error("Missing required evidence id '$id'")
    end
    return true
end

function harness_declaration_lookup(declarations)
    declarations isa AbstractVector || error("Evidence declarations must be a list")
    out = Dict{String,Any}()
    for declaration in declarations
        declaration isa AbstractDict || error("Every evidence declaration must be an object")
        haskey(declaration, "id") || error("Every evidence declaration must have an id")
        id = string(declaration["id"])
        haskey(out, id) && error("Duplicate evidence declaration id '$id'")
        out[id] = declaration
    end
    isempty(out) && error("Evidence declarations cannot be empty")
    return out
end

function harness_metadata_matches(evidence::AbstractDict, declaration::AbstractDict)
    id = string(declaration["id"])
    for key in keys(declaration)
        key_s = string(key)
        key_s in ("id", "expected", "expected_abs", "tolerance") && continue
        haskey(evidence, key_s) || error("Evidence item '$id' missing declared metadata '$key_s'")
        evidence[key_s] == declaration[key] ||
            error("Evidence item '$id' metadata '$key_s'=$(evidence[key_s]) does not match declaration $(declaration[key])")
    end
    return true
end

function harness_validate_evidence_against_declarations(evidence, declarations)
    declared = harness_declaration_lookup(declarations)
    harness_validate_evidence(evidence; required_ids=collect(keys(declared)))
    for item in evidence
        id = string(item["id"])
        haskey(declared, id) || error("Evidence item '$id' has no declaration")
        harness_metadata_matches(item, declared[id])
    end
    return true
end
