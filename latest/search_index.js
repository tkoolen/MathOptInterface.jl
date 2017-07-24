var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Introduction",
    "title": "Introduction",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#MathOptInterface-1",
    "page": "Introduction",
    "title": "MathOptInterface",
    "category": "section",
    "text": "MathOptInterface.jl is a standardized API for mathematical optimization solvers.Pages = [\"apimanual.md\", \"apireference.md\"]\nDepth = 3"
},

{
    "location": "apimanual.html#",
    "page": "Manual",
    "title": "Manual",
    "category": "page",
    "text": ""
},

{
    "location": "apimanual.html#Manual-1",
    "page": "Manual",
    "title": "Manual",
    "category": "section",
    "text": ""
},

{
    "location": "apimanual.html#Purpose-1",
    "page": "Manual",
    "title": "Purpose",
    "category": "section",
    "text": "Each mathematical optimization solver API has its own concepts and data structures for representing optimization instances and obtaining results. However, it is often desirable to represent an instance of an optimization problem at a higher level so that it is easy to try using different solvers. MathOptInterface (MOI) is an abstraction layer designed to provide a unified interface to mathematical optimization solvers so that users do not need to understand multiple solver-specific APIs. MOI can be used directly, or through a higher-level modeling interface like JuMP.MOI has been designed to replace MathProgBase, which has been used by modeling packages such as JuMP and Convex.jl. This second-generation abstraction layer addresses a number of limitations of MathProgBase. MOI is designed to:Be simple and extensible, unifying linear, quadratic, and conic optimization, and seamlessly facilitate extensions to essentially arbitrary constraints and functions (e.g., indicator constraints, complementarity constraints, and piecewise linear functions)\nBe fast by allowing access to a solver's in-memory representation of a problem without writing intermediate files (when possible) and by using multiple dispatch and avoiding requiring containers of nonconcrete types\nAllow a solver to return multiple results (e.g., a pool of solutions)\nAllow a solver to return extra arbitrary information via attributes (e.g., variable- and constraint-wise membership in an irreducible inconsistent subset for infeasibility analysis)\nProvide a greatly expanded set of status codes explaining what happened during the optimization procedure\nEnable a solver to more precisely specify which problem classes it supports\nEnable both primal and dual warm starts\nEnable adding and removing both variables and constraints by using reference objects instead of integer indices\nEnable any modification that the solver supports to an existing instance\nAvoid requiring the solver wrapper to store an additional copy of the problem dataThis manual introduces the concepts needed to understand MOI and give a high-level picture of how all of the pieces fit together. The primary focus is on MOI from the perspective of a user of the interface. At the end of the manual we have a section on Implementing a solver interface. The API Reference page lists the complete API."
},

{
    "location": "apimanual.html#Standard-form-problem-1",
    "page": "Manual",
    "title": "Standard form problem",
    "category": "section",
    "text": "The standard form problem is:beginalign\n     min_x in mathbbR^n  f_0(x)\n    \n     textst  f_i(x)  in mathcalS_i  i = 1 ldots m\nendalignwhere:the functions f_0 f_1 ldots f_m are specified by AbstractFunction objects\nthe sets mathcalS_1 ldots mathcalS_m are specified by AbstractSet objectsThe current function types are:projection onto a single coordinate: x_j, a single variable defined by a variable reference\nprojection onto multiple coordinates: a subvector of variables defined by a list of variable references\nscalar-valued affine: a^T x + b, where a is a vector and b scalar\nvector-valued affine: A x + b, where A is a matrix and b is a vector\nscalar-valued quadratic: frac12 x^T Q x + a^T x + b, where Q is a symmetric matrix, a is a vector, and b is a constant\nvector-valued quadratic: a vector of scalar-valued quadratic expressionsIn a future version, MOI could be extended to cover functions defined by evaluation oracles (e.g., for nonlinear derivative-based optimization).MOI defines some commonly used sets, but the interface is extensible to other sets recognized by the solver. [Describe currently supported sets.]"
},

{
    "location": "apimanual.html#Solvers-and-solver-instances-1",
    "page": "Manual",
    "title": "Solvers and solver instances",
    "category": "section",
    "text": "Solvers are \"factories\" used to specify solver-specific parameters and create new instances of a solver API. Solver instances should be understood as the representation of the problem in the solver's API, just as if one were using its API directly. When possible, the MOI wrapper for a solver should avoid storing an extra copy of the problem data.Through the rest of the manual, m is used as a generic solver instance."
},

{
    "location": "apimanual.html#Variables-1",
    "page": "Manual",
    "title": "Variables",
    "category": "section",
    "text": "MOI has a concept of a scalar variable (only). New scalar variables are created with addvariable! or addvariables!, which return a VariableReference or Vector{VariableReference} respectively. Integer indices are never used to reference variables.One uses VariableReference objects to set and get variable attributes. For example, the VariablePrimalStart attribute is used to provide an initial starting point for a variable or collection of variables:v = addvariable!(m)\nsetattribute!(m, VariablePrimalStart(), v, 10.5)\nv2 = addvariables!(m, 3)\nsetattribute!(m, VariablePrimalStart(), v2, [1.3,6.8,-4.6])A variable can be deleted from a model with delete!(::AbstractSolverInstance, ::VariableReference), if this functionality is supported by the solver."
},

{
    "location": "apimanual.html#Functions-1",
    "page": "Manual",
    "title": "Functions",
    "category": "section",
    "text": "MOI defines six functions as listed in the definition of the Standard form problem. The simplest function is SingleVariable defined as:struct SingleVariable <: AbstractFunction\n    variable::VariableReference\nendIf v is a VariableReference object, then SingleVariable(v) is simply the scalar-valued function from the complete set of variables in an instance that returns the value of variable v. One may also call this function a coordinate projection, which is more useful for defining constraints than as an objective function.A more interesting function is ScalarAffineFunction, defined asstruct ScalarAffineFunction{T} <: AbstractFunction\n    variables::Vector{VariableReference}\n    coefficients::Vector{T}\n    constant::T\nendIf x is a vector of VariableReference objects, then ScalarAffineFunction([x[1],x[2]],[5.0,-2.3],1.0) represents the function 5x_1 - 23x_2 + 1.Objective functions are assigned to an instance by calling setobjective!. For example,x = addvariables!(m, 2)\nsetobjective!(m, MinSense, ScalarAffineFunction([x[1],x[2]],[5.0,-2.3],1.0))sets the objective to the function just discussed in the minimization sense.See Functions and function modifications for the complete list of functions."
},

{
    "location": "apimanual.html#Sets-1",
    "page": "Manual",
    "title": "Sets",
    "category": "section",
    "text": "All constraints are specified with addconstraint! by restricting the output of some function to a set. The interface allows an arbitrary combination of functions and sets, but of course solvers may decide to support only a small number of combinations (see supportsproblem).For example, linear programming solvers should support, at least, combinations of affine functions with the LessThan and GreaterThan sets. These are simply linear constraints. SingleVariable functions combined with these same sets are used to specify upper and lower bounds on variables.The code example below encodes the linear optimization problem:beginalign\n max_x in mathbbR^2  3x_1 + 2x_2 \n\n textst  x_1 + x_2 le 5\n\n x_1  ge 0\n\nx_2  ge -1\nendalignx = addvariables!(m, 2)\nsetobjective!(m, MaxSense, ScalarAffineFunction(x, [3.0,2.0], 0.0))\naddconstraint!(m, ScalarAffineFunction(x, [1.0,1.0], 0.0), LessThan(5.0))\naddconstraint!(m, SingleVariable(x[1]), GreaterThan(0.0))\naddconstraint!(m, SingleVariable(x[2]), GreaterThan(-1.0))[Example with vector-valued set.]"
},

{
    "location": "apimanual.html#Constraints-by-function-set-pairs-1",
    "page": "Manual",
    "title": "Constraints by function-set pairs",
    "category": "section",
    "text": "Below is a list of common constraint types and how they are represented as function-set pairs in MOI. In the notation below, x is a vector of decision variables, x_i is a scalar decision variable, and all other terms are fixed constants.[Define notation more precisely. a vector; A matrix; don't reuse ulb as scalar and vector]"
},

{
    "location": "apimanual.html#Linear-constraints-1",
    "page": "Manual",
    "title": "Linear constraints",
    "category": "section",
    "text": "Mathematical Constraint MOI Function MOI Set\na^Tx le u ScalarAffineFunction LessThan\na^Tx ge l ScalarAffineFunction GreaterThan\na^Tx = b ScalarAffineFunction EqualTo\nl le a^Tx le u ScalarAffineFunction Interval\nx_i le u SingleVariable LessThan\nx_i ge l SingleVariable GreaterThan\nx_i = b SingleVariable EqualTo\nl le x_i le u SingleVariable Interval\nAx + b in mathbbR_+^n VectorAffineFunction Nonnegatives\nAx + b in mathbbR_-^n VectorAffineFunction Nonpositives\nAx + b = 0 VectorAffineFunction ZerosBy convention, solvers are not expected to support nonzero constant terms in the ScalarAffineFunctions the first four rows above, because they are redundant with the parameters of the sets. For example, 2x + 1 le 2 should be encoded as 2x le 1.Constraints with SingleVariable in LessThan, GreaterThan, EqualTo, or Interval sets have a natural interpretation as variable bounds. As such, it is typically not natural to impose multiple lower or upper bounds on the same variable, and by convention we do not ask solver interfaces to support this. It is natural, however, to impose upper and lower bounds separately as two different constraints on a single variable. The difference between imposing bounds by using a single Interval constraint and by using separate LessThan and GreaterThan constraints is that the latter will allow the solver to return separate dual multipliers for the two bounds, while the former will allow the solver to return only a single dual for the interval constraint.[Define mathbbR_+ mathbbR_-]"
},

{
    "location": "apimanual.html#Conic-constraints-1",
    "page": "Manual",
    "title": "Conic constraints",
    "category": "section",
    "text": "Mathematical Constraint MOI Function MOI Set\nlVert Ax + brVert_2 le c^Tx + d VectorAffineFunction SecondOrderCone\ny ge lVert x rVert_2 VectorOfVariables SecondOrderCone\n2yz ge lVert x rVert_2^2 yz ge 0 VectorOfVariables RotatedSecondOrderCone\n(a_1^Tx + b_1a_2^Tx + b_2a_3^Tx + b_3) in mathcalE VectorAffineFunction ExponentialCone\nA(x) in mathcalS_+ VectorAffineFunction PositiveSemidefiniteConeTriangle\nA(x) in mathcalS_+ VectorAffineFunction PositiveSemidefiniteConeScaled\nx in mathcalS_+ VectorOfVariables PositiveSemidefiniteConeTriangle\nx in mathcalS_+ VectorOfVariables PositiveSemidefiniteConeScaled[Define mathcalE (exponential cone), mathcalS_+ (smat), mathcalS_+ (svec). A(x) is an affine function of x that outputs a matrix.]"
},

{
    "location": "apimanual.html#Quadratic-constraints-1",
    "page": "Manual",
    "title": "Quadratic constraints",
    "category": "section",
    "text": "Mathematical Constraint MOI Function MOI Set\nx^TQx + a^Tx + b ge 0 ScalarQuadraticFunction GreaterThan\nx^TQx + a^Tx + b le 0 ScalarQuadraticFunction LessThan\nx^TQx + a^Tx + b = 0 ScalarQuadraticFunction EqualTo\nBilinear matrix inequality VectorQuadraticFunction PositiveSemidefiniteCone..."
},

{
    "location": "apimanual.html#Discrete-and-logical-constraints-1",
    "page": "Manual",
    "title": "Discrete and logical constraints",
    "category": "section",
    "text": "Mathematical Constraint MOI Function MOI Set\nx_i in mathbbZ SingleVariable Integer\nx_i in 01 SingleVariable ZeroOne\nx_i in 0 cup lu SingleVariable Semicontinuous\nx_i in 0 cup ll+1ldotsu-1u SingleVariable SemiInteger\nAt most one component of x can be nonzero VectorOfVariables SOS1\nAt most two components of x can be nonzero, and if so they must be adjacent components VectorOfVariables SOS2"
},

{
    "location": "apimanual.html#Solving-and-retrieving-the-results-1",
    "page": "Manual",
    "title": "Solving and retrieving the results",
    "category": "section",
    "text": "Once a solver instance is loaded with the objective function and all of the constraints, we can ask the solver to solve the instance by calling optimize!.optimize!(m)The optimization procedure may terminate for a number of reasons. The TerminationStatus attribute of the solver instance returns a TerminationStatusCode object which explains why the solver stopped. Some statuses indicate generally successful termination, some termination because of limit, and some termination because of something unexpected like invalid problem data or failure to converge. A typical usage of the TerminationStatus attribute is as follows:status = getattribute(m, TerminationStatus())\nif status == Success\n    # Ok, the solver has a result to return\nelse\n    # Handle other cases\n    # The solver may or may not have a result\nendThe Success status code specifically implies that the solver has a \"result\" to return. In the case that the solver converged to an optimal solution, this result will just be the optimal solution vector. The PrimalStatus attribute returns a ResultStatusCode that explains how to interpret the result. In the case that the solver is known to return globally optimal solutions (up to numerical tolerances), the combination of Success termination status and FeasiblePoint primal result status implies that the primal result vector should be interpreted as a globally optimal solution. A result may be available even if the status is not Success, for example, if the solver stopped because of a time limit and has a feasible but nonoptimal solution. Use the ResultCount attribute to check if one or more results are available.In addition to the primal status, the DualStatus provides important information for primal-dual solvers.If a result is available, it may be retrieved with the VariablePrimal attribute:getattribute(m, VariablePrimal(), x)If x is a VariableRefrence then the function call returns a scalar, and if x is a Vector{VariableReference} then the call returns a vector of scalars. VariablePrimal() is equivalent to VariablePrimal(1), i.e., the variable primal vector of the first result. Use VariablePrimal(N) to access the Nth result.See also the attributes ConstraintPrimal, and ConstraintDual. See Duals for a discussion of the MOI conventions for primal-dual pairs and certificates."
},

{
    "location": "apimanual.html#Common-status-situations-1",
    "page": "Manual",
    "title": "Common status situations",
    "category": "section",
    "text": "The sections below describe how to interpret different status cases for three common classes of solvers. Most importantly, it is essential to know if a solver is expected to provide a global or only locally optimal solution when interpreting the result statuses. Solver wrappers may provide additional information on how the solver's statuses map to MOI statuses."
},

{
    "location": "apimanual.html#Primal-dual-convex-solver-1",
    "page": "Manual",
    "title": "Primal-dual convex solver",
    "category": "section",
    "text": "A typical primal-dual solver is capable of certifying optimality of a solution to a convex optimization problem by providing a primal-dual feasible solution with matching objective values. It may also certify that either the primal or dual problem is infeasible by providing a certain ray of the dual or primal, respectively. Typically two solves are required to certify unboundedness, one to find a ray and a second to find a feasible point. A solver may also provide a facial reduction certificate. When a primal-dual solver terminates with Success status, it is reasonable to assume that a primal and dual statuses of FeasiblePoint imply that the corresponding primal-dual results are a (numerically) optimal primal-dual pair. The AlmostSuccess status implies that the solve has completed to relaxed tolerances, so in this case FeasiblePoint or NearlyFeasiblePoint statuses would imply a near-optimal primal-dual pair. For all other termination statuses, there are no specific guarantees on the results returned."
},

{
    "location": "apimanual.html#Global-mixed-integer-or-nonconvex-solver-1",
    "page": "Manual",
    "title": "Global mixed-integer or nonconvex solver",
    "category": "section",
    "text": "When a global solver returns Success and the primal result is a FeasiblePoint, then it is implied that the primal result is indeed a globally optimal solution up to the specified tolerances. Typically, no dual certificate is available to certify optimality. The ObjectiveBound should provide extra information on the optimality gap."
},

{
    "location": "apimanual.html#Local-solver-1",
    "page": "Manual",
    "title": "Local solver",
    "category": "section",
    "text": "For solvers which perform a search based only on local criteria (for example, gradient descent), without additional knowledge of the structure of the problem, we can say only that Success and FeasiblePoint imply that the primal result belongs to the class of points which the chosen algorithm is known to converge to. Gradient descent algorithms may converge to saddle points, for example. It is also possible for such algorithms to converge to infeasible points, in which case the termination status would be Success and the primal result status would be InfeasiblePoint. This does not imply that the problem is infeasible and so cannot be called a certificate of infeasibility."
},

{
    "location": "apimanual.html#A-complete-example:-solveknapsack-1",
    "page": "Manual",
    "title": "A complete example: solveknapsack",
    "category": "section",
    "text": "The solveknapsack function below demonstrates the complete process from data to solver instance to result vector using MOI.[ needs formatting help ]\"\"\"\n    solveknapsack(c, w, C)\n\nSolve the binary-constrained knapsack problem: max c'x: w'x <= C, x binary.\nReturns the optimal weights and objective value. Throws an error if the solver\ndoes not terminate with a `Success` status.\n\"\"\"\nfunction solveknapsack(c::Vector{Float64}, w::Vector{Float64}, C::Float64, solver::AbstractSolver)\n    if !supportsproblem(solver, ScalarAffineFunction,\n            [(ScalarAffineFunction,LessThan),\n             (SingleVariable,ZeroOne)])\n        error(\"Provided solver cannot solve binary knapsack problems\")\n    end\n    numvar = length(c)\n    @assert numvar == length(w)\n\n    m = SolverInstance(solver)\n\n    # create the variables in the problem\n    x = addvariables!(m, numvar)\n\n    # set the objective function\n    setobjective!(m, MaxSense, ScalarAffineFunction(x, c, 0.0))\n\n    # add the knapsack constraint\n    addconstraint!(m, ScalarAffineFunction(x, w, 0.0), LessThan(C))\n\n    # add integrality constraints\n    for i in 1:numvar\n        addconstraint!(m, SingleVariable(x[i]), ZeroOne())\n    end\n\n    # all set\n    optimize!(m)\n\n    termination_status = getattribute(m, TerminationStatus())\n    objvalue = cangetattribute(m, ObjectiveValue()) ? getattribute(m, ObjectiveValue()) : NaN\n    if termination_status != Success\n        error(\"Solver terminated with status $termination_status\")\n    end\n\n    @assert getattribute(m, ResultCount()) > 0\n\n    result_status = getattribute(m, PrimalStatus())\n    if result_status != FeasiblePoint\n        error(\"Solver ran successfully did not return a feasible point. The problem may be infeasible.\")\n    end\n    primal_variable_result = getattribute(m, VariableResult(), x)\n\n    return (objvalue, primal_variable_result)\nend"
},

{
    "location": "apimanual.html#A-more-complex-example:-solveintegerlinear-1",
    "page": "Manual",
    "title": "A more complex example: solveintegerlinear",
    "category": "section",
    "text": "[this needs formatting help]\"\"\"\n    IntegerLinearResult\n\nA `struct` returned by `solverintegerlinear` containing solution information.\nThe fields are as follows:\n\n  - `termination_status`: the `TerminationStatusCode` returned by the solver\n  - `result_status`: the `ResultStatusCode` returned by the solver (if any results are available)\n  - `primal_variable_result`: the primal result vector returned by the solver; if no result is returned then this vector has length zero\n  - `objective_value`: the objective value of the result vector as reported by the solver\n  - `objective_bound`: the best known bound on the optimal objective value\n\"\"\"\nstruct IntegerLinearResult\n    termination_status::TerminationStatusCode\n    result_status::ResultStatusCode\n    primal_variable_result::Vector{Float64}\n    objective_value::Float64\n    objective_bound::Float64\nend\n\n\"\"\"\n    solveintegerlinear(c, Ale, ble, Aeq, beq, lb, ub, integerindices, solver)\n\nSolve the mixed-integer linear optimization problem: min c'x s.t. `Ale*x` <= `ble`, `Aeq*x` = `beq`, `lb` <= `x` <= `ub`, and`x[i]` is integer for `i` in `integerindices` using the solver specified by `solver`. Returns an `IntegerLinearResult`.\n\"\"\"\nfunction solverintegerlinear(c, Ale::SparseMatrixCSC, ble, Aeq::SparseMatrixCSC, beq, lb, ub, integerindices, solver)\n    if !supportsproblem(solver, ScalarAffineFunction{Float64},\n            [(ScalarAffineFunction,LessThan{Float64}),\n             (ScalarAffineFunction,Zeros),\n             (SingleVariable,LessThan{Float64}),\n             (SingleVariable,GreaterThan{Float64}),\n             (SingleVariable,Integer)])\n        error(\"Provided solver does not support mixed-integer linear optimization\")\n    end\n    numvar = size(Ale,2)\n    @assert numvar == size(Aeq,2) == length(lb) == length(ub)\n\n\n    m = SolverInstance(solver)\n\n    # create the variables in the problem\n    x = addvariables!(m, numvar)\n\n    # set the objective function\n    setobjective!(m, MinSense, ScalarAffineFunction(x, c, 0.0))\n\n    # add variable bound constraints\n    for i in 1:numvar\n        if isfinite(lb[i])\n            addconstraint!(m, SingleVariable(x[i]), GreaterThan(lb[i]))\n        end\n        if isfinite(ub[i])\n            addconstraint!(m, SingleVariable(x[i]), LessThan(ub[i]))\n        end\n    end\n\n    # add integrality constraints\n    for i in integerindices\n        @assert 1 <= i <= numvar\n        addconstraint!(m, SingleVariable(x[i]), Integer())\n    end\n\n    # convert a SparseMatrixCSC into a vector of scalar affine functions\n    # meant to be illustrative, not the fastest possible\n    function csc_to_affine(A::SparseMatrixCSC)\n        nrow = size(A,1)\n        variables_by_row = [Vector{VariableReference}(0) for k in 1:nrow]\n        coefficients_by_row = [Vector{Float64}(0) for k in 1:nrow]\n\n        I,J,V = findnz(A) # convert the sparse matrix to triplet form\n        for p in 1:length(I)\n            push!(variables_by_row[I[p]], x[J[p]])\n            push!(coefficients_by_row[I[p]], V[p])\n        end\n        return [ScalarAffineFunction(variables_by_row[k], coefficients_by_row[k], 0.0) for k in 1:nrow]\n    end\n\n    # add inequality constraints\n    Ale_affine = csc_to_affine(Ale)\n    for k in 1:length(Ale_affine)\n        addconstraint!(m, Ale_affine[k], LessThan(ble[k]))\n    end\n\n    # add equality constraints\n    Aeq_affine = csc_to_affine(Aeq)\n    for k in 1:length(Aeq_affine)\n        addconstraint!(m, Aeq_affine[k], EqualTo(beq[k]))\n    end\n\n    # all set\n    optimize!(m)\n\n    termination_status = getattribute(m, TerminationStatus())\n    objbound = cangetattribute(m, ObjectiveBound()) ? getattribute(m, ObjectiveBound()) : NaN\n    objvalue = cangetattribute(m, ObjectiveValue()) ? getattribute(m, ObjectiveValue()) : NaN\n\n    if getattribute(m, ResultCount()) > 0\n        result_status = getattribute(m, PrimalStatus())\n        primal_variable_result = getattribute(m, VariableResult(), x)\n        return IntegerLinearResult(termination_status, result_status, primal_variable_result, objvalue, objbound)\n    else\n        return IntegerLinearResult(termination_status, UnknownResultStatus, Float64[], objvalue, objbound)\n    end\nend"
},

{
    "location": "apimanual.html#Advanced-1",
    "page": "Manual",
    "title": "Advanced",
    "category": "section",
    "text": ""
},

{
    "location": "apimanual.html#Duals-1",
    "page": "Manual",
    "title": "Duals",
    "category": "section",
    "text": "Conic duality is the starting point for MOI's duality conventions. When all functions are affine (or coordinate projections), and all constraint sets are closed convex cone, the instance may be called a conic optimization problem. For conic-form minimization problems, the primal is:beginalign\n min_x in mathbbR^n  a_0^T x + b_0\n\n textst  A_i x + b_i  in mathcalC_i  i = 1 ldots m\nendalignand the dual is:beginalign\n max_y_1 ldots y_m  -sum_i=1^m b_i^T y_i + b_0\n\n textst  a_0 - sum_i=1^m A_i^T y_i  = 0\n\n  y_i  in mathcalC_i^*  i = 1 ldots m\nendalignwhere each mathcalC_i is a closed convex cone and mathcalC_i^* is its dual cone.For conic-form maximization problems, the primal is:beginalign\n max_x in mathbbR^n  a_0^T x + b_0\n\n textst  A_i x + b_i  in mathcalC_i  i = 1 ldots m\nendalignand the dual is:beginalign\n min_y_1 ldots y_m  sum_i=1^m b_i^T y_i + b_0\n\n textst  a_0 + sum_i=1^m A_i^T y_i  = 0\n\n  y_i  in mathcalC_i^*  i = 1 ldots m\nendalignA linear inequality constraint a^T x + b ge c should be interpreted as a^T x + b - c in mathbbR_+, and similarly a^T x + b le c should be interpreted as a^T x + b - c in mathbbR_-. Variable-wise constraints should be interpreted as affine constraints with the appropriate identity mapping in place of A_i.For the special case of minimization LPs, the MOI primal form can be stated asbeginalign\n min_x in mathbbR^n  a_0^T x + b_0\n\n textst\nA_1 x  ge b_1\n A_2 x  le b_2\n A_3 x  = b_3\nendalignBy applying the stated transformations to conic form, taking the dual, and transforming back into linear inequality form, one obtains the following dual:beginalign\n max_y_1y_2y_3  b_1^Ty_1 + b_2^Ty_2 + b_3^Ty_3 + b_0\n\n textst\nA_1^Ty_1 + A_2^Ty_2 + A_3^Ty_3  = a_0\n y_1 ge 0\n y_2 le 0\nendalignFor maximization LPs, the MOI primal form can be stated as:beginalign\n max_x in mathbbR^n  a_0^T x + b_0\n\n textst\nA_1 x  ge b_1\n A_2 x  le b_2\n A_3 x  = b_3\nendalignand similarly, the dual is:beginalign\n min_y_1y_2y_3  -b_1^Ty_1 - b_2^Ty_2 - b_3^Ty_3 + b_0\n\n textst\nA_1^Ty_1 + A_2^Ty_2 + A_3^Ty_3  = -a_0\n y_1 ge 0\n y_2 le 0\nendalignAn important note for the LP case is that the signs of the feasible duals depend only on the sense of the inequality and not on the objective sense.Currently, a convention for duals is not defined for problems with non-conic sets mathcalS_i or quadratic functions f_0 f_i."
},

{
    "location": "apimanual.html#Modifying-an-instance-1",
    "page": "Manual",
    "title": "Modifying an instance",
    "category": "section",
    "text": "[Explain modifyconstraint! and modifyobjective!.]"
},

{
    "location": "apimanual.html#Implementing-a-solver-interface-1",
    "page": "Manual",
    "title": "Implementing a solver interface",
    "category": "section",
    "text": "[The interface is designed for multiple dispatch, e.g., attributes, combinations of sets and functions.][Avoid storing extra copies of the problem when possible.]MOI defines a very general interface, with multiple possible ways to describe the same constraint. This is considered a feature, not a bug. MOI is designed to make it possible to experiment with alternative representations of an optimization problem at both the solving and modeling level. When implementing an interface, it is important to keep in mind that the constraints which a solver supports via MOI will have a near 1-to-1 correspondence with how users can express problems in JuMP, because JuMP does not perform automatic transformations. (Alternative systems like Convex.jl do.) For example, if a solver wrapper does not support ScalarAffineFunction-in-LessThan constraints, then users will not be able to write: @constraint(m, 2x + y <= 10) in JuMP. That said, from the perspective of JuMP, solvers can safely choose to not support the following constraints:ScalarAffineFunction in GreaterThan, LessThan, or EqualTo with a nonzero constant in the function. Constants in the affine function should instead be moved into the parameters of the corresponding sets.\nScalarAffineFunction in Nonnegative, Nonpositive or Zeros. Alternative constraints are available by using a VectorAffineFunction with one output row or ScalarAffineFunction with GreaterThan, LessThan, or EqualTo.\nTwo SingleVariable-in-LessThan constraints applied to the same variable (similarly with GreaterThan). These should be interpreted as variable bounds, and each variable naturally has at most one upper or lower bound.There is no special interface for column generation. If the solver has a special API for setting coefficients in existing constraints when adding a new variable, it is possible to queue modifications and new variables and then call the solver's API once all of the new coefficients are known.All data passed to the solver should be copied immediately to internal data structures. Solvers may not modify any input vectors and should not assume that input vectors will not be modified by users in the future. This applies, for example, to the coefficient vector in ScalarAffineFunction. Vectors returned to the user, e.g., via ObjectiveFunction or ConstraintFunction attributes should not be modified by the solver afterwards. The in-place version of getattribute! can be used by users to avoid extra copies in this case.Solver wrappers should document how the low-level solver statuses map to the MOI statuses. In particular, the characterization of a result with status FeasiblePoint and termination status Success is entirely solver defined. It may or may not be a globally optimal solution. Solver wrappers are not responsible for verifying the feasibility of results. Statuses like NearlyFeasiblePoint, InfeasiblePoint, NearlyInfeasiblePoint, and NearlyReductionCertificate are designed to be used when the solver explicitly indicates as much.MOI solver interfaces may be in the same package as the solver itself (either the C wrapper if the solver is accessible through C, or the Julia code if the solver is written in Julia, for example). In some cases it may be more appropriate to host the MOI wrapper in its own package; in this case it is recommended that the MOI wrapper package be named MathOptInterfaceXXX where XXX is the solver name."
},

{
    "location": "apireference.html#",
    "page": "Reference",
    "title": "Reference",
    "category": "page",
    "text": "CurrentModule = MathOptInterface"
},

{
    "location": "apireference.html#API-Reference-1",
    "page": "Reference",
    "title": "API Reference",
    "category": "section",
    "text": "[Some introduction to API. List basic standalone methods.]"
},

{
    "location": "apireference.html#MathOptInterface.AbstractSolverAttribute",
    "page": "Reference",
    "title": "MathOptInterface.AbstractSolverAttribute",
    "category": "Type",
    "text": "AbstractSolverAttribute\n\nAbstract supertype for attribute objects that can be used to set or get attributes (properties) of the solver.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.AbstractSolverInstanceAttribute",
    "page": "Reference",
    "title": "MathOptInterface.AbstractSolverInstanceAttribute",
    "category": "Type",
    "text": "AbstractSolverInstanceAttribute\n\nAbstract supertype for attribute objects that can be used to set or get attributes (properties) of the solver instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.AbstractVariableAttribute",
    "page": "Reference",
    "title": "MathOptInterface.AbstractVariableAttribute",
    "category": "Type",
    "text": "AbstractVariableAttribute\n\nAbstract supertype for attribute objects that can be used to set or get attributes (properties) of variables in the solver instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.AbstractConstraintAttribute",
    "page": "Reference",
    "title": "MathOptInterface.AbstractConstraintAttribute",
    "category": "Type",
    "text": "AbstractConstraintAttribute\n\nAbstract supertype for attribute objects that can be used to set or get attributes (properties) of constraints in the solver instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.cangetattribute",
    "page": "Reference",
    "title": "MathOptInterface.cangetattribute",
    "category": "Function",
    "text": "cangetattribute(s::AbstractSolver, attr::AbstractSolverAttribute)::Bool\n\nReturn a Bool indicating whether it is possible to query attribute attr from the solver s.\n\ncangetattribute(m::AbstractSolverInstance, attr::AbstractVariableAttribute, R::Type{VariableReference})::Bool\ncangetattribute(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, R::Type{ConstraintReference{F,S})::Bool\n\nReturn a Bool indicating whether the solver instance m currently has a value for the attributed specified by attribute type attr applied to the reference type R.\n\nExamples\n\ncangetattribute(m, ObjectiveValue())\ncangetattribute(m, VariablePrimalStart(), varref)\ncangetattribute(m, ConstraintPrimal(), conref)\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.getattribute",
    "page": "Reference",
    "title": "MathOptInterface.getattribute",
    "category": "Function",
    "text": "getattribute(s::AbstractSolver, attr::AbstractSolverAttribute)\n\nReturn an attribute attr of the solver s.\n\ngetattribute(m::AbstractSolverInstance, attr::AbstractSolverInstanceAttribute)\n\nReturn an attribute attr of the solver instance m.\n\ngetattribute(m::AbstractSolverInstance, attr::AbstractVariableAttribute, v::VariableReference)\n\nReturn an attribute attr of the variable v in solver instance m.\n\ngetattribute(m::AbstractSolverInstance, attr::AbstractVariableAttribute, v::Vector{VariableReference})\n\nReturn a vector of attributes corresponding to each variable in the collection v in the solver instance m.\n\ngetattribute(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, c::ConstraintReference)\n\nReturn an attribute attr of the constraint c in solver instance m.\n\ngetattribute(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, c::Vector{ConstraintReference{F,S}})\n\nReturn a vector of attributes corresponding to each constraint in the collection c in the solver instance m.\n\nExamples\n\ngetattribute(m, ObjectiveValue())\ngetattribute(m, VariableResult(), ref)\ngetattribute(m, VariableResult(5), [ref1, ref2])\ngetattribute(m, OtherAttribute(\"something specific to cplex\"))\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.getattribute!",
    "page": "Reference",
    "title": "MathOptInterface.getattribute!",
    "category": "Function",
    "text": "getattribute!(output, m::AbstractSolverInstance, args...)\n\nAn in-place version of getattribute. The signature matches that of getattribute except that the the result is placed in the vector output.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.cansetattribute",
    "page": "Reference",
    "title": "MathOptInterface.cansetattribute",
    "category": "Function",
    "text": "cansetattribute(s::AbstractSolver, attr::AbstractSolverAttribute)::Bool\n\nReturn a Bool indicating whether it is possible to set attribute attr in the solver s.\n\ncansetattribute(m::AbstractSolverInstance, attr::AbstractVariableAttribute, R::Type{VariableReference})::Bool\ncangetattribute(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, R::Type{ConstraintReference{F,S})::Bool\n\nReturn a Bool indicating whether it is possible to set attribute attr applied to the reference type R in the solver instance m.\n\nExamples\n\ncansetattribute(m, ObjectiveValue())\ncansetattribute(m, VariablePrimalStart(), VariableReference)\ncansetattribute(m, ConstraintPrimal(), ConstraintReference{VectorAffineFunction{Float64},Nonnegatives})\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.setattribute!",
    "page": "Reference",
    "title": "MathOptInterface.setattribute!",
    "category": "Function",
    "text": "setattribute!(s::AbstractSolver, attr::AbstractSolverAttribute, value)\n\nAssign value to the attribute attr of the solver s.\n\nsetattribute!(m::AbstractSolverInstance, attr::AbstractSolverInstanceAttribute, value)\n\nAssign value to the attribute attr of the solver instance m.\n\nsetattribute!(m::AbstractSolverInstance, attr::AbstractVariableAttribute, v::VariableReference, value)\n\nAssign value to the attribute attr of variable v in solver instance m.\n\nsetattribute!(m::AbstractSolverInstance, attr::AbstractVariableAttribute, v::Vector{VariableReference}, vector_of_values)\n\nAssign a value respectively to the attribute attr of each variable in the collection v in solver instance m.\n\nsetattribute!(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, c::ConstraintReference, value)\n\nAssign a value to the attribute attr of constraint c in solver instance m.\n\nsetattribute!(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, c::Vector{ConstraintReference{F,S}})\n\nAssign a value respectively to the attribute attr of each constraint in the collection c in solver instance m.\n\n\n\n"
},

{
    "location": "apireference.html#Attributes-1",
    "page": "Reference",
    "title": "Attributes",
    "category": "section",
    "text": "List of attribute categories.AbstractSolverAttribute\nAbstractSolverInstanceAttribute\nAbstractVariableAttribute\nAbstractConstraintAttributeFunctions for getting and setting attributes.cangetattribute\ngetattribute\ngetattribute!\ncansetattribute\nsetattribute!"
},

{
    "location": "apireference.html#MathOptInterface.AbstractSolver",
    "page": "Reference",
    "title": "MathOptInterface.AbstractSolver",
    "category": "Type",
    "text": "AbstractSolver\n\nAbstract supertype for \"solver\" objects. A solver is a lightweight object used for selecting solvers and parameters. It does not store any solver instance data.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.supportsproblem",
    "page": "Reference",
    "title": "MathOptInterface.supportsproblem",
    "category": "Function",
    "text": "supportsproblem(s::AbstractSolver, objective_type::F, constraint_types::Vector)::Bool\n\nReturn true if the solver supports optimizing a problem with objective type F and constraints of the types specified by constraint_types which is a list of tuples (F,S) for F-in-S constraints. Return false if the solver does not support this problem class.\n\nExamples\n\nsupportsproblem(s, ScalarAffineFunction{Float64},\n    [(ScalarAffineFunction{Float64},Zeros),\n    (ScalarAffineFunction{Float64},LessThan),\n    (ScalarAffineFunction{Float64},GreaterThan)])\n\nshould be true for a linear programming solver s.\n\nsupportsproblem(s, ScalarQuadraticFunction{Float64},\n    [(ScalarAffineFunction{Float64},Zeros),\n    (ScalarAffineFunction{Float64},LessThan),\n    (ScalarAffineFunction{Float64},GreaterThan)])\n\nshould be true for a quadratic programming solver s.\n\nsupportsproblem(s, ScalarAffineFunction{Float64},\n    [(ScalarAffineFunction{Float64},Zeros),\n    (ScalarAffineFunction{Float64},LessThan),\n    (ScalarAffineFunction{Float64},GreaterThan),\n    (SingleVariable,ZeroOne)])\n\nshould be true for a mixed-integer linear programming solver s.\n\nsupportsproblem(s, ScalarAffineFunction{Float64},\n    [(ScalarAffineFunction{Float64},Zeros),\n    (ScalarAffineFunction{Float64},LessThan),\n    (ScalarAffineFunction{Float64},GreaterThan),\n    (VectorAffineFunction{Float64},SecondOrderCone)])\n\nshould be true for a second-order cone solver s.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SupportsDuals",
    "page": "Reference",
    "title": "MathOptInterface.SupportsDuals",
    "category": "Type",
    "text": "SupportsDuals()\n\nA Bool indicating if the solver should be expected to return dual solutions when appropriate.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SupportsAddConstraintAfterSolve",
    "page": "Reference",
    "title": "MathOptInterface.SupportsAddConstraintAfterSolve",
    "category": "Type",
    "text": "SupportsAddConstraintAfterSolve()\n\nA Bool indicating if the solver supports adding constraints after a solve. If false, then a new solver instance should be constructed instead.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SupportsDeleteConstraint",
    "page": "Reference",
    "title": "MathOptInterface.SupportsDeleteConstraint",
    "category": "Type",
    "text": "SupportsDeleteConstraint()\n\nA Bool indicating if the solver supports deleting constraints from a solver instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SupportsDeleteVariable",
    "page": "Reference",
    "title": "MathOptInterface.SupportsDeleteVariable",
    "category": "Type",
    "text": "SupportsDeleteVariable()\n\nA Bool indicating if the solver supports deleting variables from a solver instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SupportsAddVariableAfterSolve",
    "page": "Reference",
    "title": "MathOptInterface.SupportsAddVariableAfterSolve",
    "category": "Type",
    "text": "SupportsAddVariableAfterSolve()\n\nA Bool indicating if the solver supports adding variables after a solve. In the context of linear programming, this is known as column generation.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SupportsConicThroughQuadratic",
    "page": "Reference",
    "title": "MathOptInterface.SupportsConicThroughQuadratic",
    "category": "Type",
    "text": "SupportsConicThroughQuadratic()\n\nA Bool indicating if the solver interprets certain quadratic constraints as second-order cone constraints.\n\n\n\n"
},

{
    "location": "apireference.html#Solver-1",
    "page": "Reference",
    "title": "Solver",
    "category": "section",
    "text": "AbstractSolver\nsupportsproblemList of solver attributesSupportsDuals\nSupportsAddConstraintAfterSolve\nSupportsDeleteConstraint\nSupportsDeleteVariable\nSupportsAddVariableAfterSolve\nSupportsConicThroughQuadratic"
},

{
    "location": "apireference.html#MathOptInterface.AbstractSolverInstance",
    "page": "Reference",
    "title": "MathOptInterface.AbstractSolverInstance",
    "category": "Type",
    "text": "AbstractSolverInstance\n\nAbstract supertype which represents a solver's in-memory representation of an optimization problem.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SolverInstance",
    "page": "Reference",
    "title": "MathOptInterface.SolverInstance",
    "category": "Function",
    "text": "SolverInstance(solver::AbstractSolver)\n\nCreate a solver instance from the given solver.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.optimize!",
    "page": "Reference",
    "title": "MathOptInterface.optimize!",
    "category": "Function",
    "text": "optimize!(m::AbstractSolverInstance)\n\nStart the solution procedure.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.free!",
    "page": "Reference",
    "title": "MathOptInterface.free!",
    "category": "Function",
    "text": "free!(m::AbstractSolverInstance)\n\nRelease any resources and memory used by the solver instance. Note that the Julia garbage collector takes care of this automatically, but automatic collection cannot always be forced. This method is useful for more precise control of resources, especially in the case of commercial solvers with licensing restrictions on the number of concurrent runs. Users must discard the solver instance object after this method is invoked.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.RawSolver",
    "page": "Reference",
    "title": "MathOptInterface.RawSolver",
    "category": "Type",
    "text": "RawSolver()\n\nAn object that may be used to access a solver-specific API for this solver instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.Sense",
    "page": "Reference",
    "title": "MathOptInterface.Sense",
    "category": "Type",
    "text": "Sense()\n\nThe optimization sense of the solver instance, an OptimizationSense with value MinSense, MaxSense, or FeasiblitySense.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.NumberOfVariables",
    "page": "Reference",
    "title": "MathOptInterface.NumberOfVariables",
    "category": "Type",
    "text": "NumberOfVariables()\n\nThe number of variables in the solver instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.NumberOfConstraints",
    "page": "Reference",
    "title": "MathOptInterface.NumberOfConstraints",
    "category": "Type",
    "text": "NumberOfConstraints{F,S}()\n\nThe number of constraints of the type F-in-S present in the solver instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ListOfConstraints",
    "page": "Reference",
    "title": "MathOptInterface.ListOfConstraints",
    "category": "Type",
    "text": "ListOfConstraints()\n\nA list of tuples of the form (F,S), where F is a function type and S is a set type indicating that the attribute NumberOfConstraints{F,S}() has value greater than zero.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ResultCount",
    "page": "Reference",
    "title": "MathOptInterface.ResultCount",
    "category": "Type",
    "text": "ResultCount()\n\nThe number of results available.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ObjectiveFunction",
    "page": "Reference",
    "title": "MathOptInterface.ObjectiveFunction",
    "category": "Type",
    "text": "ObjectiveFunction()\n\nAn AbstractFunction instance which represents the objective function. It is guaranteed to be equivalent but not necessarily identical to the function provided by the user.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ObjectiveValue",
    "page": "Reference",
    "title": "MathOptInterface.ObjectiveValue",
    "category": "Type",
    "text": "ObjectiveValue(resultidx::Int=1)\n\nThe objective value of the resultindexth primal result.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ObjectiveBound",
    "page": "Reference",
    "title": "MathOptInterface.ObjectiveBound",
    "category": "Type",
    "text": "ObjectiveBound()\n\nThe best known bound on the optimal objective value.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.RelativeGap",
    "page": "Reference",
    "title": "MathOptInterface.RelativeGap",
    "category": "Type",
    "text": "RelativeGap()\n\nThe final relative optimality gap, defined as fracb-ff, where b is the best bound and f is the best feasible objective value.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SolveTime",
    "page": "Reference",
    "title": "MathOptInterface.SolveTime",
    "category": "Type",
    "text": "SolveTime()\n\nThe total elapsed solution time (in seconds) as reported by the solver.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SimplexIterations",
    "page": "Reference",
    "title": "MathOptInterface.SimplexIterations",
    "category": "Type",
    "text": "SimplexIterations()\n\nThe cumulative number of simplex iterations during the optimization process. In particular, for a mixed-integer program (MIP), the total simplex iterations for all nodes.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.BarrierIterations",
    "page": "Reference",
    "title": "MathOptInterface.BarrierIterations",
    "category": "Type",
    "text": "BarrierIterations()\n\nThe cumulative number of barrier iterations while solving a problem.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.NodeCount",
    "page": "Reference",
    "title": "MathOptInterface.NodeCount",
    "category": "Type",
    "text": "NodeCount()\n\nThe total number of branch-and-bound nodes explored while solving a mixed-integer program (MIP).\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.TerminationStatus",
    "page": "Reference",
    "title": "MathOptInterface.TerminationStatus",
    "category": "Type",
    "text": "TerminationStatus()\n\nA TerminationStatusCode explaining why the solver stopped.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.PrimalStatus",
    "page": "Reference",
    "title": "MathOptInterface.PrimalStatus",
    "category": "Type",
    "text": "PrimalStatus(N)\nPrimalStatus()\n\nThe ResultStatusCode of the primal result N. If N is omitted, it defaults to 1.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.DualStatus",
    "page": "Reference",
    "title": "MathOptInterface.DualStatus",
    "category": "Type",
    "text": "DualStatus(N)\nDualStatus()\n\nThe ResultStatusCode of the dual result N. If N is omitted, it defaults to 1.\n\n\n\n"
},

{
    "location": "apireference.html#Solver-Instance-1",
    "page": "Reference",
    "title": "Solver Instance",
    "category": "section",
    "text": "AbstractSolverInstanceSolverInstance\noptimize!\nfree!List of solver instance attributesRawSolver\nSense\nNumberOfVariables\nNumberOfConstraints\nListOfConstraints\nResultCount\nObjectiveFunction\nObjectiveValue\nObjectiveBound\nRelativeGap\nSolveTime\nSimplexIterations\nBarrierIterations\nNodeCount\nTerminationStatus\nPrimalStatus\nDualStatus"
},

{
    "location": "apireference.html#MathOptInterface.TerminationStatusCode",
    "page": "Reference",
    "title": "MathOptInterface.TerminationStatusCode",
    "category": "Type",
    "text": "TerminationStatusCode\n\nAn Enum of possible values for the TerminationStatus attribute. This attribute is meant to explain the reason why the solver stopped executing.\n\nOK\n\nThese are generally OK statuses.\n\nSuccess: the algorithm ran successfully and has a result; this includes cases where the algorithm converges to an infeasible point (NLP) or converges to a solution of a homogeneous self-dual problem and has a certificate of primal/dual infeasibility\nInfeasibleNoResult: the algorithm stopped because it decided that the problem is infeasible but does not have a result to return\nUnboundedNoResult: the algorithm stopped because it decided that the problem is unbounded but does not have a result to return\nInfeasibleOrUnbounded: the algorithm stopped because it decided that the problem is infeasible or unbounded (no result is available); this occasionally happens during MIP presolve\n\nLimits\n\nThe solver stopped because of some user-defined limit. To be documented: IterationLimit, TimeLimit, NodeLimit, SolutionLimit, MemoryLimit, ObjectiveLimit, NormLimit, OtherLimit.\n\nProblematic\n\nThis group of statuses means that something unexpected or problematic happened.\n\nSlowProgress: the algorithm stopped because it was unable to continue making progress towards the solution\nAlmostSuccess should be used if there is additional information that relaxed convergence tolerances are satisfied\n\nTo be documented: NumericalError, InvalidInstance, InvalidOption, Interrupted, OtherError.\n\n\n\n"
},

{
    "location": "apireference.html#Termination-Status-1",
    "page": "Reference",
    "title": "Termination Status",
    "category": "section",
    "text": "The TerminationStatus attribute indicates why the solver stopped executing. The value of the attribute is of type TerminationStatusCode.TerminationStatusCode"
},

{
    "location": "apireference.html#MathOptInterface.ResultStatusCode",
    "page": "Reference",
    "title": "MathOptInterface.ResultStatusCode",
    "category": "Type",
    "text": "ResultStatusCode\n\nAn Enum of possible values for the PrimalStatus and DualStatus attributes. The values indicate how to interpret the result vector.\n\nFeasiblePoint\nNearlyFeasiblePoint\nInfeasiblePoint\nInfeasibilityCertificate\nNearlyInfeasibilityCertificate\nReductionCertificate\nNearlyReductionCertificate\nUnknownResultStatus\nOtherResultStatus\n\n\n\n"
},

{
    "location": "apireference.html#Result-Status-1",
    "page": "Reference",
    "title": "Result Status",
    "category": "section",
    "text": "The PrimalStatus and DualStatus attributes indicate how to interpret the result returned by the solver. The value of the attribute is of type ResultStatusCode.ResultStatusCode"
},

{
    "location": "apireference.html#Variables-and-Constraints-1",
    "page": "Reference",
    "title": "Variables and Constraints",
    "category": "section",
    "text": ""
},

{
    "location": "apireference.html#MathOptInterface.BasisStatusCode",
    "page": "Reference",
    "title": "MathOptInterface.BasisStatusCode",
    "category": "Type",
    "text": "BasisStatusCode\n\nAn Enum of possible values for the VariableBasisStatus and ConstraintBasisStatus attribute. This explains the status of a given element with respect to an optimal solution basis. Possible values are:\n\nBasic: element is in the basis\nNonbasic: element is not in the basis\nNonbasicAtLower: element is not in the basis and is at its lower bound\nNonbasicAtUpper: element is not in the basis and is at its upper bound\nSuperBasic: element is not in the basis but is also not at one of its bounds\n\n\n\n"
},

{
    "location": "apireference.html#Basis-Status-1",
    "page": "Reference",
    "title": "Basis Status",
    "category": "section",
    "text": "The BasisStatus attribute of a variable or constraint describes its status with respect to a basis, if one is known. The value of the attribute is of type BasisStatusCode.BasisStatusCode"
},

{
    "location": "apireference.html#MathOptInterface.VariableReference",
    "page": "Reference",
    "title": "MathOptInterface.VariableReference",
    "category": "Type",
    "text": "VariableReference\n\nA lightweight object used to reference variables in a solver instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ConstraintReference",
    "page": "Reference",
    "title": "MathOptInterface.ConstraintReference",
    "category": "Type",
    "text": "ConstraintReference{F,S}\n\nA lightweight object used to reference F-in-S constraints in a solver instance. The parameter F is the type of the function in the constraint, and the parameter S is the type of set in the constraint.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.candelete",
    "page": "Reference",
    "title": "MathOptInterface.candelete",
    "category": "Function",
    "text": "candelete(m::AbstractSolverInstance, ref::AnyReference)::Bool\n\nReturn a Bool indicating whether the object referred to by ref can be removed from the solver instance m.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.isvalid",
    "page": "Reference",
    "title": "MathOptInterface.isvalid",
    "category": "Function",
    "text": "isvalid(m::AbstractSolverInstance, ref::AnyReference)::Bool\n\nReturn a Bool indicating whether this reference refers to a valid object in the solver instance m.\n\n\n\n"
},

{
    "location": "apireference.html#Base.delete!-Tuple{MathOptInterface.AbstractSolverInstance,Union{MathOptInterface.ConstraintReference, MathOptInterface.VariableReference}}",
    "page": "Reference",
    "title": "Base.delete!",
    "category": "Method",
    "text": "delete!(m::AbstractSolverInstance, ref::AnyReference)\n\nDelete the referenced object from the solver instance.\n\ndelete!{R}(m::AbstractSolverInstance, refs::Vector{R<:AnyReference})\n\nDelete the referenced objects in the vector refs from the solver instance. It may be assumed that R is a concrete type.\n\n\n\n"
},

{
    "location": "apireference.html#References-1",
    "page": "Reference",
    "title": "References",
    "category": "section",
    "text": "VariableReference\nConstraintReference\ncandelete\nisvalid\ndelete!(::AbstractSolverInstance,::AnyReference)"
},

{
    "location": "apireference.html#MathOptInterface.addvariables!",
    "page": "Reference",
    "title": "MathOptInterface.addvariables!",
    "category": "Function",
    "text": "addvariables!(m::AbstractSolverInstance, n::Int)::Vector{VariableReference}\n\nAdd n scalar variables to the solver instance, returning a vector of variable references.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.addvariable!",
    "page": "Reference",
    "title": "MathOptInterface.addvariable!",
    "category": "Function",
    "text": "addvariable!(m::AbstractSolverInstance)::VariableReference\n\nAdd a scalar variable to the solver instance, returning a variable reference.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.VariablePrimalStart",
    "page": "Reference",
    "title": "MathOptInterface.VariablePrimalStart",
    "category": "Type",
    "text": "VariablePrimalStart()\n\nAn initial assignment of the variables that the solver may use to warm-start the solve.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.VariablePrimal",
    "page": "Reference",
    "title": "MathOptInterface.VariablePrimal",
    "category": "Type",
    "text": "VariablePrimal(N)\nVariablePrimal()\n\nThe assignment to the primal variables in result N. If N is omitted, it is 1 by default.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.VariableBasisStatus",
    "page": "Reference",
    "title": "MathOptInterface.VariableBasisStatus",
    "category": "Type",
    "text": "VariableBasisStatus()\n\nReturns the BasisStatusCode of a given variable, with respect to an available optimal solution basis.\n\n\n\n"
},

{
    "location": "apireference.html#Variables-1",
    "page": "Reference",
    "title": "Variables",
    "category": "section",
    "text": "Functions for adding variables. For deleting, see references section.addvariables!\naddvariable!List of attributes associated with variables. [category AbstractVariableAttribute] Calls to getattribute and setattribute! should include as an argument a single VariableReference or a vector of VariableReference objects.VariablePrimalStart\nVariablePrimal\nVariableBasisStatus"
},

{
    "location": "apireference.html#MathOptInterface.isvalid-Tuple{MathOptInterface.AbstractSolverInstance,MathOptInterface.ConstraintReference}",
    "page": "Reference",
    "title": "MathOptInterface.isvalid",
    "category": "Method",
    "text": "isvalid(m::AbstractSolverInstance, ref::AnyReference)::Bool\n\nReturn a Bool indicating whether this reference refers to a valid object in the solver instance m.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.addconstraint!",
    "page": "Reference",
    "title": "MathOptInterface.addconstraint!",
    "category": "Function",
    "text": "addconstraint!(m::AbstractSolverInstance, func::F, set::S)::ConstraintReference{F,S}\n\nAdd the constraint f(x) in mathcalS where f is defined by func, and mathcalS is defined by set.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.modifyconstraint!",
    "page": "Reference",
    "title": "MathOptInterface.modifyconstraint!",
    "category": "Function",
    "text": "Modify Function\n\nmodifyconstraint!(m::AbstractSolverInstance, c::ConstraintReference, func::F)\n\nReplace the function in constraint c with func. F must match the original function type used to define the constraint.\n\nExamples\n\nIf c is a ConstraintReference{ScalarAffineFunction,S} and v1 and v2 are VariableReference objects,\n\nmodifyconstraint!(m, c, ScalarAffineFunction([v1,v2],[1.0,2.0],5.0))\nmodifyconstraint!(m, c, SingleVariable(v1)) # Error\n\nModify Set\n\nmodifyconstraint!(m::AbstractSolverInstance, c::ConstraintReference, S::S)\n\nChange the set of constraint c to the new set S which should be of the same type as the original set.\n\nExamples\n\nIf c is a ConstraintReference{F,Interval}\n\nmodifyconstraint!(m, c, Interval(0, 5))\nmodifyconstraint!(m, c, NonPositives) # Error\n\nPartial Modifications\n\nmodifyconstraint!(m::AbstractSolverInstance, c::ConstraintReference, change::AbstractFunctionModification)\n\nApply the modification specified by change to the function of constraint c.\n\nExamples\n\nmodifyconstraint!(m, c, ScalarConstantChange(10.0))\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ConstraintPrimalStart",
    "page": "Reference",
    "title": "MathOptInterface.ConstraintPrimalStart",
    "category": "Type",
    "text": "ConstraintPrimalStart()\n\nAn initial assignment of the constraint primal values that the solver may use to warm-start the solve.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ConstraintDualStart",
    "page": "Reference",
    "title": "MathOptInterface.ConstraintDualStart",
    "category": "Type",
    "text": "ConstraintDualStart()\n\nAn initial assignment of the constraint duals that the solver may use to warm-start the solve.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ConstraintPrimal",
    "page": "Reference",
    "title": "MathOptInterface.ConstraintPrimal",
    "category": "Type",
    "text": "ConstraintPrimal(N)\nConstraintPrimal()\n\nThe assignment to the constraint primal values in result N. If N is omitted, it is 1 by default.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ConstraintDual",
    "page": "Reference",
    "title": "MathOptInterface.ConstraintDual",
    "category": "Type",
    "text": "ConstraintDual(N)\nConstraintDual()\n\nThe assignment to the constraint dual values in result N. If N is omitted, it is 1 by default.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ConstraintBasisStatus",
    "page": "Reference",
    "title": "MathOptInterface.ConstraintBasisStatus",
    "category": "Type",
    "text": "ConstraintBasisStatus()\n\nReturns the BasisStatusCode of a given constraint, with respect to an available optimal solution basis.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ConstraintFunction",
    "page": "Reference",
    "title": "MathOptInterface.ConstraintFunction",
    "category": "Type",
    "text": "ConstraintFunction()\n\nReturn the AbstractFunction object used to define the constraint. It is guaranteed to be equivalent but not necessarily identical to the function provided by the user.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ConstraintSet",
    "page": "Reference",
    "title": "MathOptInterface.ConstraintSet",
    "category": "Type",
    "text": "ConstraintSet()\n\nReturn the AbstractSet object used to define the constraint.\n\n\n\n"
},

{
    "location": "apireference.html#Constraints-1",
    "page": "Reference",
    "title": "Constraints",
    "category": "section",
    "text": "Functions for adding and modifying constraints.isvalid(::AbstractSolverInstance,::ConstraintReference)\naddconstraint!\nmodifyconstraint!List of attributes associated with constraints. [category AbstractConstraintAttribute] Calls to getattribute and setattribute! should include as an argument a single ConstraintReference or a vector of ConstraintReference{F,S} objects.ConstraintPrimalStart\nConstraintDualStart\nConstraintPrimal\nConstraintDual\nConstraintBasisStatus\nConstraintFunction\nConstraintSet"
},

{
    "location": "apireference.html#MathOptInterface.AbstractFunction",
    "page": "Reference",
    "title": "MathOptInterface.AbstractFunction",
    "category": "Type",
    "text": "AbstractFunction\n\nAbstract supertype for function objects.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SingleVariable",
    "page": "Reference",
    "title": "MathOptInterface.SingleVariable",
    "category": "Type",
    "text": "SingleVariable(variable)\n\nThe function that extracts the scalar variable referenced by variable, a VariableReference. This function is naturally be used for single variable bounds or integrality constraints.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.VectorOfVariables",
    "page": "Reference",
    "title": "MathOptInterface.VectorOfVariables",
    "category": "Type",
    "text": "VectorOfVariables(variables)\n\nThe function that extracts the vector of variables referenced by variables, a Vector{VariableReference}. This function is naturally be used for constraints that apply to groups of variables, such as an \"all different\" constraint, an indicator constraint, or a complementarity constraint.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ScalarAffineFunction",
    "page": "Reference",
    "title": "MathOptInterface.ScalarAffineFunction",
    "category": "Type",
    "text": "ScalarAffineFunction{T}(variables, coefficients, constant)\n\nThe scalar-valued affine function a^T x + b, where:\n\na is a sparse vector specified in tuple form by variables::Vector{VariableReference} and coefficients::Vector{T}\nb is a scalar specified by constant::T\n\nDuplicate variable references in variables are accepted, and the corresponding coefficients are summed together.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.VectorAffineFunction",
    "page": "Reference",
    "title": "MathOptInterface.VectorAffineFunction",
    "category": "Type",
    "text": "VectorAffineFunction{T}(outputindex, variables, coefficients, constant)\n\nThe vector-valued affine function A x + b, where:\n\nA is a sparse matrix specified in triplet form by outputindex, variables, coefficients\nb is a vector specified by constant\n\nDuplicate indices in the A are accepted, and the corresponding coefficients are summed together.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ScalarQuadraticFunction",
    "page": "Reference",
    "title": "MathOptInterface.ScalarQuadraticFunction",
    "category": "Type",
    "text": "ScalarQuadraticFunction{T}(affine_variables, affine_coefficients, quadratic_rowvariables, quadratic_colvariables, quadratic_coefficients, constant)\n\nThe scalar-valued quadratic function frac12x^TQx + a^T x + b, where:\n\na is a sparse vector specified in tuple form by affine_variables, affine_coefficients\nb is a scalar specified by constant\nQ is a symmetric matrix is specified in triplet form by quadratic_rowvariables, quadratic_colvariables, quadratic_coefficients\n\nDuplicate indices in a or Q are accepted, and the corresponding coefficients are summed together. \"Mirrored\" indices (q,r) and (r,q) (where r and q are VariableReferences) are considered duplicates; only one need be specified.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.VectorQuadraticFunction",
    "page": "Reference",
    "title": "MathOptInterface.VectorQuadraticFunction",
    "category": "Type",
    "text": "VectorQuadraticFunction{T}(affine_variables, affine_coefficients, quadratic_rowvariables, quadratic_colvariables, quadratic_coefficients, constant)\n\nThe vector-valued quadratic function with ith component (\"output index\") defined as frac12x^TQ_ix + a_i^T x + b_i, where:\n\na_i is a sparse vector specified in tuple form by the subset of affine_variables, affine_coefficients for the indices k where affine_outputindex[k] == i.\nb_i is a scalar specified by constant[i]\nQ_i is a symmetric matrix is specified in triplet form by the subset of quadratic_rowvariables, quadratic_colvariables, quadratic_coefficients for the indices k where quadratic_outputindex[k] == i\n\nDuplicate indices in a_i or Q_i are accepted, and the corresponding coefficients are summed together. \"Mirrored\" indices (q,r) and (r,q) (where r and q are VariableReferences) are considered duplicates; only one need be specified.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ScalarConstantChange",
    "page": "Reference",
    "title": "MathOptInterface.ScalarConstantChange",
    "category": "Type",
    "text": "ScalarConstantChange{T}(new_constant)\n\nA struct used to request a change in the constant term of a scalar-valued function. Applicable to ScalarAffineFunction and ScalarQuadraticFunction.\n\n\n\n"
},

{
    "location": "apireference.html#Functions-and-function-modifications-1",
    "page": "Reference",
    "title": "Functions and function modifications",
    "category": "section",
    "text": "List of recognized functions.AbstractFunction\nSingleVariable\nVectorOfVariables\nScalarAffineFunction\nVectorAffineFunction\nScalarQuadraticFunction\nVectorQuadraticFunctionList of function modifications.ScalarConstantChange"
},

{
    "location": "apireference.html#MathOptInterface.AbstractSet",
    "page": "Reference",
    "title": "MathOptInterface.AbstractSet",
    "category": "Type",
    "text": "AbstractSet\n\nAbstract supertype for set objects used to encode constraints.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.Reals",
    "page": "Reference",
    "title": "MathOptInterface.Reals",
    "category": "Type",
    "text": "Reals(dim)\n\nThe set mathbbR^dim (containing all points) of dimension dim.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.Zeros",
    "page": "Reference",
    "title": "MathOptInterface.Zeros",
    "category": "Type",
    "text": "Zeros(dim)\n\nThe set  0 ^dim (containing only the origin) of dimension dim.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.Nonnegatives",
    "page": "Reference",
    "title": "MathOptInterface.Nonnegatives",
    "category": "Type",
    "text": "Nonnegatives(dim)\n\nThe nonnegative orthant  x in mathbbR^dim  x ge 0  of dimension dim.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.Nonpositives",
    "page": "Reference",
    "title": "MathOptInterface.Nonpositives",
    "category": "Type",
    "text": "Nonpositives(dim)\n\nThe nonpositive orthant  x in mathbbR^dim  x le 0  of dimension dim.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.GreaterThan",
    "page": "Reference",
    "title": "MathOptInterface.GreaterThan",
    "category": "Type",
    "text": "GreaterThan(lower)\n\nThe set lowerinfty) subseteq mathbbR.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.LessThan",
    "page": "Reference",
    "title": "MathOptInterface.LessThan",
    "category": "Type",
    "text": "LessThan(upper)\n\nThe set (-inftyupper subseteq mathbbR.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.EqualTo",
    "page": "Reference",
    "title": "MathOptInterface.EqualTo",
    "category": "Type",
    "text": "EqualTo(value)\n\nThe set containing the single point x in mathbbR where x is given by value.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.Interval",
    "page": "Reference",
    "title": "MathOptInterface.Interval",
    "category": "Type",
    "text": "Interval(lower,upper)\n\nThe interval lower upper subseteq mathbbR. If lower or upper is -Inf or Inf, respectively, the set is interpreted as a one-sided interval.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SecondOrderCone",
    "page": "Reference",
    "title": "MathOptInterface.SecondOrderCone",
    "category": "Type",
    "text": "SecondOrderCone(dim)\n\nThe second-order cone (or Lorenz cone)  (tx) in mathbbR^dim  t ge  x _2  of dimension dim.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.RotatedSecondOrderCone",
    "page": "Reference",
    "title": "MathOptInterface.RotatedSecondOrderCone",
    "category": "Type",
    "text": "RotatedSecondOrderCone(dim)\n\nThe rotated second-order cone  (tux) mathbbR^dim  2tu ge  x _2^2 tu ge 0  of dimension dim.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ExponentialCone",
    "page": "Reference",
    "title": "MathOptInterface.ExponentialCone",
    "category": "Type",
    "text": "ExponentialCone()\n\nThe 3-dimensional exponential cone  (xyz) in mathbbR^3  y exp (xy) le z y  0 .\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.DualExponentialCone",
    "page": "Reference",
    "title": "MathOptInterface.DualExponentialCone",
    "category": "Type",
    "text": "DualExponentialCone()\n\nThe 3-dimensional dual exponential cone  (uvw) in mathbbR^3  -u exp (vu) le exp(1) w u  0 .\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.PowerCone",
    "page": "Reference",
    "title": "MathOptInterface.PowerCone",
    "category": "Type",
    "text": "PowerCone(a)\n\nThe 3-dimensional power cone  (xyz) in mathbbR^3  x^a y^1-a = z x ge 0 y ge 0  with parameter a.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.DualPowerCone",
    "page": "Reference",
    "title": "MathOptInterface.DualPowerCone",
    "category": "Type",
    "text": "DualPowerCone(a)\n\nThe 3-dimensional power cone  (uvw) in mathbbR^3  (fracua)^a (fracv1-a)^1-a = w u ge 0 v ge 0  with parameter a.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.PositiveSemidefiniteConeTriangle",
    "page": "Reference",
    "title": "MathOptInterface.PositiveSemidefiniteConeTriangle",
    "category": "Type",
    "text": "PositiveSemidefiniteConeTriangle(dim)\n\nThe (vectorized) cone of symmetric positive semidefinite matrices, with off-diagonals unscaled. The entries of the upper triangular part of the matrix are given row by row (or equivalently, the entries of the lower triangular part are given column by column). An n times n matrix has n(n+1)2 lower-triangular elements, so for the vectorized cone of dimension dim, the corresponding symmetric matrix has side dimension sqrt (14 + 2 dim) - 12 elements. The scalar product is the sum of the pairwise product of the diagonal entries plus twice the sum of the pairwise product of the upper diagonal entries.\n\nExamples\n\nThe matrix\n\nbeginbmatrix\n  1  2  3\n  2  4  5\n  3  5  6\nendbmatrix\n\ncorresponds to (1 2 3 4 5 6) for PositiveSemidefiniteConeTriangle\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.PositiveSemidefiniteConeScaled",
    "page": "Reference",
    "title": "MathOptInterface.PositiveSemidefiniteConeScaled",
    "category": "Type",
    "text": "PositiveSemidefiniteConeScaled(dim)\n\nThe (vectorized) cone of symmetric positive semidefinite matrices, with off-diagonals scaled. The entries of the upper triangular part of the matrix are given row by row (or equivalently, the entries of the lower triangular part are given column by column). An n times n matrix has n(n+1)2 lower-triangular elements, so for the vectorized cone of dimension dim, the corresponding symmetric matrix has side dimension sqrt (14 + 2 dim) - 12 elements. The off-diagonal entries of the matrices of both the cone and its dual are scaled by sqrt2 and the scalar product is simply the sum of the pairwise product of the entries.\n\nExamples\n\nThe matrix\n\nbeginbmatrix\n  1  2  3\n  2  4  5\n  3  5  6\nendbmatrix\n\nand to (1 2sqrt2 3sqrt2 4 5sqrt2 6) for PositiveSemidefiniteConeScaled.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.Integer",
    "page": "Reference",
    "title": "MathOptInterface.Integer",
    "category": "Type",
    "text": "Integer()\n\nThe set of integers mathbbZ.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ZeroOne",
    "page": "Reference",
    "title": "MathOptInterface.ZeroOne",
    "category": "Type",
    "text": "ZeroOne()\n\nThe set  0 1 .\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.Semicontinuous",
    "page": "Reference",
    "title": "MathOptInterface.Semicontinuous",
    "category": "Type",
    "text": "Semicontinuous(l,u)\n\nThe set 0 cup lu.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SemiInteger",
    "page": "Reference",
    "title": "MathOptInterface.SemiInteger",
    "category": "Type",
    "text": "SemiInteger(l,u)\n\nThe set 0 cup ll+1ldotsu-1u.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SOS1",
    "page": "Reference",
    "title": "MathOptInterface.SOS1",
    "category": "Type",
    "text": "SOS1(weights)\n\nThe set corresponding to the special ordered set (SOS) constraint of type 1. Of the variables in the set, at most one can be nonzero. The weights induce an ordering of the variables; as such, they should be unique values. The kth element in the set corresponds to the kth weight in weights. See here for a description of SOS constraints and their potential uses.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SOS2",
    "page": "Reference",
    "title": "MathOptInterface.SOS2",
    "category": "Type",
    "text": "SOS2(weights)\n\nThe set corresponding to the special ordered set (SOS) constraint of type 2. Of the variables in the set, at most two can be nonzero, and if two are nonzero, they must be adjacent in the ordering of the set. The weights induce an ordering of the variables; as such, they should be unique values. The kth element in the set corresponds to the kth weight in weights. See here for a description of SOS constraints and their potential uses.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.dimension",
    "page": "Reference",
    "title": "MathOptInterface.dimension",
    "category": "Function",
    "text": "dimension(s::AbstractVectorSet)\n\nReturn the underlying dimension (number of vector components) in the set s, i.e., n if the set is a subset of mathbbR^n.\n\n\n\n"
},

{
    "location": "apireference.html#Sets-1",
    "page": "Reference",
    "title": "Sets",
    "category": "section",
    "text": "List of recognized sets.AbstractSet\nReals\nZeros\nNonnegatives\nNonpositives\nGreaterThan\nLessThan\nEqualTo\nInterval\nSecondOrderCone\nRotatedSecondOrderCone\nExponentialCone\nDualExponentialCone\nPowerCone\nDualPowerCone\nPositiveSemidefiniteConeTriangle\nPositiveSemidefiniteConeScaled\nInteger\nZeroOne\nSemicontinuous\nSemiInteger\nSOS1\nSOS2Functions for getting and setting properties of sets.dimension"
},

{
    "location": "apireference.html#MathOptInterface.setobjective!",
    "page": "Reference",
    "title": "MathOptInterface.setobjective!",
    "category": "Function",
    "text": "setobjective!(m::AbstractSolverInstance, sense::OptimizationSense, func::F)\n\nSet the objective function in the solver instance m to be f(x) where f is a function specified by func with the optimization sense (MinSense or MaxSense) specified by sense.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.modifyobjective!",
    "page": "Reference",
    "title": "MathOptInterface.modifyobjective!",
    "category": "Function",
    "text": "modifyobjective!(m::AbstractSolverInstance, change::AbstractFunctionModification)\n\nApply the modification specified by change to the objective function of m. To change the function completely, call setobjective! instead.\n\nExamples\n\nmodifyobjective!(m, ScalarConstantChange(10.0))\n\n\n\n"
},

{
    "location": "apireference.html#Objectives-1",
    "page": "Reference",
    "title": "Objectives",
    "category": "section",
    "text": "Functions for adding and modifying objectives.setobjective!\nmodifyobjective!"
},

]}
