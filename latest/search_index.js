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
    "location": "apimanual.html#Concepts-1",
    "page": "Manual",
    "title": "Concepts",
    "category": "section",
    "text": "The standard form problem is:beginalign\n     min_x in mathbbR^n  f_0(x)\n    \n     textst  f_i(x)  in mathcalS_i  i = 1 ldots m\nendalignwhere:objective function f_0 is affine or quadratic\nconstraint functions f_i is variable-wise, affine, or quadratic\nconstraint sets mathcalS_i are pre-defined real scalar or vector setsThis API defines some commonly-used sets, but is extensible to other sets recognized by the solver. Currently, all functions are described compactly with lists, vectors, and matrices. The function types are:variable-wise: x_j, a (scalar) variable\naffine: A_i x + b_i, where A_i is a matrix and b_i is a vector\nquadratic: q_i(x) + A_i x + b_i, where q_i(x) is a scalar quadratic expression of the form frac12 x^T Q_i x (for objective or constraints) with symmetric matrix Q_i, or a vector of such quadratic expressions (for constraints only) with symmetric matrices Q_i1 ldots Q_iK_i"
},

{
    "location": "apimanual.html#Duals-1",
    "page": "Manual",
    "title": "Duals",
    "category": "section",
    "text": "Currently, a convention for duals is not defined for problems with non-conic sets mathcalS_i or quadratic functions f_0 f_i. Note that bound constraints are supported by re-interpretation in terms of the nonnegative or nonpositive cones. An affine constraint a^T x + b ge c should be interpreted as a^T x + b - c in mathbbR_+, and similarly a^T x + b le c should be interpreted as a^T x + b - c in mathbbR_-. Variable-wise constraints should be interpreted as affine constraints with the appropriate identity mapping in place of A_i.For such conic form minimization problems, the primal is:beginalign\n min_x in mathbbR^n  a_0^T x + b_0\n\n textst  A_i x + b_i  in mathcalC_i  i = 1 ldots m\nendalignand the dual is:beginalign\n max_y_1 ldots y_m  -sum_i=1^m b_i^T y_i + b_0\n\n textst  a_0 - sum_i=1^m A_i^T y_i  in 0^n\n\n  y_i  in mathcalC_i^*  i = 1 ldots m\nendalignwhere each mathcalC_i is a closed convex cone and mathcalC_i is its dual cone.Note:lower bounds have nonnegative duals\nupper bounds have nonpositive duals\nclosed convex cones have duals belonging to the corresponding dual cones"
},

{
    "location": "apireference.html#",
    "page": "Reference",
    "title": "Reference",
    "category": "page",
    "text": "CurrentModule = MathOptInterface"
},

{
    "location": "apireference.html#API-1",
    "page": "Reference",
    "title": "API",
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
    "text": "cangetattribute(s::AbstractSolver, attr::AbstractSolverAttribute)::Bool\n\nReturn a Bool indicating whether it is possible to query attribute attr from the solver s.\n\ncangetattribute(m::AbstractSolverInstance, attr::AbstractVariableAttribute, R::Type{VariableReference})::Bool\ncangetattribute(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, R::Type{VariablewiseConstraintReference{T})::Bool\ncangetattribute(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, R::Type{AffineConstraintReference{T})::Bool\ncangetattribute(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, R::Type{QuadraticConstraintReference{T})::Bool\n\nReturn a Bool indicating whether the solver instance m currently has a value for the attributed specified by attribute type attr applied to the reference type R.\n\nExamples\n\ncangetattribute(GurobiSolver(), SupportsAffineConstraint{Zero}())\ncangetattribute(m, ObjectiveValue())\ncangetattribute(m, VariablePrimalStart(), varref)\ncangetattribute(m, ConstraintPrimal(), conref)\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.getattribute",
    "page": "Reference",
    "title": "MathOptInterface.getattribute",
    "category": "Function",
    "text": "getattribute(s::AbstractSolver, attr::AbstractSolverAttribute)\n\nReturn an attribute attr of the solver s.\n\ngetattribute(m::AbstractSolverInstance, attr::AbstractSolverInstanceAttribute)\n\nReturn an attribute attr of the solver instance m.\n\ngetattribute(m::AbstractSolverInstance, attr::AbstractVariableAttribute, v::VariableReference)\n\nReturn an attribute attr of the variable v in solver instance m.\n\ngetattribute(m::AbstractSolverInstance, attr::AbstractVariableAttribute, v::Vector{VariableReference})\n\nReturn a vector of attributes corresponding to each variable in the collection v in the solver instance m.\n\ngetattribute(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, c::ConstraintReference)\n\nReturn an attribute attr of the constraint c in solver instance m.\n\ngetattribute(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, c::Vector{VariablewiseConstraintReference{T}})\ngetattribute(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, c::Vector{AffineConstraintReference{T}})\ngetattribute(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, c::Vector{QuadraticConstraintReference{T}})\n\nReturn a vector of attributes corresponding to each constraint in the collection c in the solver instance m.\n\nExamples\n\ngetattribute(m, ObjectiveValue())\ngetattribute(m, VariableResult(), ref)\ngetattribute(m, VariableResult(5), [ref1, ref2])\ngetattribute(m, OtherAttribute(\"something specific to cplex\"))\n\n\n\n"
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
    "text": "cansetattribute(s::AbstractSolver, attr::AbstractSolverAttribute)::Bool\n\nReturn a Bool indicating whether it is possible to set attribute attr in the solver s.\n\ncansetattribute(m::AbstractSolverInstance, attr::AbstractVariableAttribute, R::Type{VariableReference})::Bool\ncansetattribute(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, R::Type{VariablewiseConstraintReference{T})::Bool\ncangetattribute(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, R::Type{AffineConstraintReference{T})::Bool\ncangetattribute(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, R::Type{QuadraticConstraintReference{T})::Bool\n\nReturn a Bool indicating whether it is possible to set attribute attr applied to the reference type R in the solver instance m.\n\nExamples\n\ncansetattribute(GurobiSolver(), SupportsAffineConstraint{Zero}())\ncansetattribute(m, ObjectiveValue())\ncansetattribute(m, VariablePrimalStart(), VariableReference)\ncansetattribute(m, ConstraintPrimal(), AffineConstraintReference{NonNegative})\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.setattribute!",
    "page": "Reference",
    "title": "MathOptInterface.setattribute!",
    "category": "Function",
    "text": "setattribute!(s::AbstractSolver, attr::AbstractSolverAttribute, value)\n\nAssign value to the attribute attr of the solver s.\n\nsetattribute!(m::AbstractSolverInstance, attr::AbstractSolverInstanceAttribute, value)\n\nAssign value to the attribute attr of the solver instance m.\n\nsetattribute!(m::AbstractSolverInstance, attr::AbstractVariableAttribute, v::VariableReference, value)\n\nAssign value to the attribute attr of variable v in solver instance m.\n\nsetattribute!(m::AbstractSolverInstance, attr::AbstractVariableAttribute, v::Vector{VariableReference}, vector_of_values)\n\nAssign a value respectively to the attribute attr of each variable in the collection v in solver instance m.\n\nsetattribute!(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, c::ConstraintReference, value)\n\nAssign a value to the attribute attr of constraint c in solver instance m.\n\nsetattribute!(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, c::Vector{VariablewiseConstraintReference{T}})\nsetattribute!(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, c::Vector{AffineConstraintReference{T}})\nsetattribute!(m::AbstractSolverInstance, attr::AbstractConstraintAttribute, c::Vector{QuadraticConstraintReference{T}})\n\nAssign a value respectively to the attribute attr of each constraint in the collection c in solver instance m.\n\n\n\n"
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
    "text": "supportsproblem(s::AbstractSolver, objective_type::F, constriant_types::Vector)::Bool\n\nReturn true if the solver supports optimizing a problem with objective type F and constraints of the types specified by constraint_types which is a list of tuples (F,S) for F-in-S constraints. Return false if the solver does not support this problem class.\n\nExamples\n\nsupportsproblem(s, ScalarAffineFunction{Float64},\n    [(ScalarAffineFunction{Float64},Zeros),\n    (ScalarAffineFunction{Float64},LessThan),\n    (ScalarAffineFunction{Float64},GreaterThan)])\n\nshould be true for a linear programming solver s.\n\nsupportsproblem(s, ScalarQuadraticFunction{Float64},\n    [(ScalarAffineFunction{Float64},Zeros),\n    (ScalarAffineFunction{Float64},LessThan),\n    (ScalarAffineFunction{Float64},GreaterThan)])\n\nshould be true for a quadratic programming solver s.\n\nsupportsproblem(s, ScalarAffineFunction{Float64},\n    [(ScalarAffineFunction{Float64},Zeros),\n    (ScalarAffineFunction{Float64},LessThan),\n    (ScalarAffineFunction{Float64},GreaterThan),\n    (ScalarVariablewiseFunction{Float64},ZeroOne)])\n\nshould be true for a mixed-integer linear programming solver s.\n\nsupportsproblem(s, ScalarAffineFunction{Float64},\n    [(ScalarAffineFunction{Float64},Zeros),\n    (ScalarAffineFunction{Float64},LessThan),\n    (ScalarAffineFunction{Float64},GreaterThan),\n    (VectorAffineFunction{Float64},SecondOrderCone)])\n\nshould be true for a second-order cone solver s.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ReturnsDuals",
    "page": "Reference",
    "title": "MathOptInterface.ReturnsDuals",
    "category": "Type",
    "text": "ReturnsDuals()\n\nA Bool indicating if the solver should be expected to return dual solutions when appropriate.\n\n\n\n"
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
    "text": "AbstractSolver\nsupportsproblemList of solver attributesReturnsDuals\nSupportsAddConstraintAfterSolve\nSupportsDeleteConstraint\nSupportsAddVariableAfterSolve\nSupportsConicThroughQuadratic"
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
    "text": "Sense()\n\nThe optimization sense of the solver instance, an OptimizationSense with value MinSense or MaxSense.\n\n\n\n"
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
    "location": "apireference.html#MathOptInterface.ListOfPresentConstraints",
    "page": "Reference",
    "title": "MathOptInterface.ListOfPresentConstraints",
    "category": "Type",
    "text": "ListOfPresentConstraints()\n\nA list of tuples of the form (F,S), where F is a function type and S is a set type indicating that the attribute NumberOfConstraints{F,S}() has value greater than zero.\n\n\n\n"
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
    "text": "ObjectiveFunction()\n\nAn AbstractFunction instance which represents the objective function.\n\n\n\n"
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
    "text": "AbstractSolverInstanceSolverInstance\noptimize!\nfree!List of solver instance attributesRawSolver\nSense\nNumberOfVariables\nNumberOfConstraints\nListOfPresentConstraints\nResultCount\nObjectiveFunction\nObjectiveValue\nObjectiveBound\nRelativeGap\nSolveTime\nSimplexIterations\nBarrierIterations\nNodeCount\nTerminationStatus\nPrimalStatus\nDualStatus"
},

{
    "location": "apireference.html#MathOptInterface.TerminationStatusCode",
    "page": "Reference",
    "title": "MathOptInterface.TerminationStatusCode",
    "category": "Type",
    "text": "TerminationStatusCode\n\nAn Enum of possible values for the TerminationStatus attribute. This attribute is meant to explain the reason why the solver stopped executing.\n\nOK\n\nThese are generally OK statuses.\n\nSuccess: the algorithm ran successfully and has a result; this includes cases where the algorithm converges to an infeasible point (NLP) or converges to a solution of a homogeneous self-dual problem and has a certificate of primal/dual infeasibility\nAlmostSuccess: the algorithm almost ran successfully (e.g., to relaxed convergence tolerances) and has a result\nInfeasibleNoResult: the algorithm stopped because it decided that the problem is infeasible but does not have a result to return\nUnboundedNoResult: the algorithm stopped because it decided that the problem is unbounded but does not have a result to return\nInfeasibleOrUnbounded: the algorithm stopped because it decided that the problem is infeasible or unbounded (no result is available); this occasionally happens during MIP presolve\n\nLimits\n\nThe solver stopped because of some user-defined limit. To be documented: IterationLimit, TimeLimit, NodeLimit, SolutionLimit, MemoryLimit, ObjectiveLimit, NormLimit, OtherLimit.\n\nProblematic\n\nThis group of statuses means that something unexpected or problematic happened.\n\nSlowProgress: the algorithm stopped because it was unable to continue making progress towards the solution\nAlmostSuccess should be used if there is additional information that relaxed convergence tolerances are satisfied\n\nTo be documented: NumericalError, InvalidSolverInstance, InvalidOption, Interrupted, OtherError.\n\n\n\n"
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
    "text": "ResultStatusCode\n\nAn Enum of possible values for the PrimalStatus and DualStatus attributes. The values indicate how to interpret the result vector.\n\nFeasiblePoint\nNearlyFeasiblePoint\nInfeasiblePoint\nInfeasibilityCertificate\nNearlyInfeasibilityCertificate\nReductionCertificate\nNearlyReductionCertificate\nUnknown\nOther\n\n\n\n"
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
    "text": "delete!(m::AbstractSolverInstance, ref::AnyReference)\n\nDelete the referenced object from the solver instance.\n\ndelete!(m::AbstractSolverInstance, refs::Vector{<:AnyReference})\n\nDelete the referenced objects in the vector refs from the solver instance. It may be assumed that R is a concrete type.\n\n\n\n"
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
    "text": "addvariable!(m::AbstractSolverInstance)::VariableReference\n\nAdd a scalar variable to the solver instance, returning a variable reference. In addition, there is a special case for adding variables to existing linear problems.\n\naddvariable!(m::AbstractSolverInstance, cref::Vector{Union{AffineConstraintRef{NonPositive}, AffineConstraintRef{NonNegative}, AffineConstraintRef{Zero}, AffineConstraintRef{Interval}}}, coefs)::VariableReference\n\nAdd a variable with coefficients specified by coefs in the existing affine constraints given by the constraint references cref. To add a variable with coefficients in a constraint that is not listed here, use addvariable!(m) and then modifyconstraint! instead.\n\n\n\n"
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
    "text": "Modify Function\n\nmodifyconstraint!(m::AbstractSolverInstance, c::ConstraintReference, func::F)\n\nReplace the function in constraint c with func. F must match the original function type used to define the constraint.\n\nExamples\n\nIf c is a ConstraintReference{ScalarAffineFunction,S} and v1 and v2 are VariableReference objects,\n\nmodifyconstraint!(m, c, ScalarAffineFunction([v1,v2],[1.0,2.0],5.0))\nmodifyconstraint!(m, c, ScalarVariablewiseFunction(v1)) # Error\n\nModify Set\n\nmodifyconstraint!(m::AbstractSolverInstance, c::ConstraintReference, S::S)\n\nChange the set of constraint c to the new set S which should be of the same type as the original set.\n\nExamples\n\nIf c is a ConstraintReference{F,Interval}\n\nmodifyconstraint!(m, c, Interval(0, 5))\nmodifyconstraint!(m, c, NonPositives) # Error\n\n## Partial Modifications\n\n    modifyconstraint!(m::AbstractSolverInstance, c::ConstraintReference, change::AbstractFunctionModification)\n\nApply the modification specified by `change` to the function of constraint `c`.\n\n### Examples\n\n\njulia modifyconstraint!(m, c, ScalarConstantChange(10.0)) ```\n\n\n\n"
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
    "text": "ConstraintDualStart()\n\nAn initial assignment of the constriant duals that the solver may use to warm-start the solve.\n\n\n\n"
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
    "text": "ConstraintFunction()\n\nReturn the AbstractFunction object used to define the constraint.\n\n\n\n"
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
    "location": "apireference.html#MathOptInterface.ScalarVariablewiseFunction",
    "page": "Reference",
    "title": "MathOptInterface.ScalarVariablewiseFunction",
    "category": "Type",
    "text": "ScalarVariablewiseFunction(variable)\n\nThe function that extracts the scalar variable referenced by variable, a VariableReference. This function would naturally be used for single variable bounds or integrality constraints.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.VectorVariablewiseFunction",
    "page": "Reference",
    "title": "MathOptInterface.VectorVariablewiseFunction",
    "category": "Type",
    "text": "VectorVariablewiseFunction(variables)\n\nThe function that extracts the vector of variables referenced by variables, a Vector{VariableReference}. This function would naturally be used for constraints that apply to groups of variables, such as an \"all different\" constraint, an indicator constraint, or a complementarity constraint.\n\n\n\n"
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
    "text": "ScalarQuadraticFunction{T}(affine_variables, affine_coefficients, quadratic_rowvariables, quadratic_colvariables, quadratic_coefficients, constant)\n\nThe scalar-valued quadratic function frac12x^TQx + a^T x + b, where:\n\na is a sparse vector specified in tuple form by affine_variables, affine_coefficients\nb is a scalar specified by constant\nQ is a symmetric matrix is specified in triplet form by quadratic_rowvariables, quadratic_colvariables, quadratic_coefficients\n\nDuplicate indices in a or Q are accepted, and the corresponding coefficients are summed together. \"Mirrored\" indices (r,q) and (r,q) (where r and q are VariableReferences) are considered duplicates; only one need be specified.\n\n\n\n"
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
    "location": "apireference.html#Functions-1",
    "page": "Reference",
    "title": "Functions",
    "category": "section",
    "text": "List of recognized functions.AbstractFunction\nScalarVariablewiseFunction\nVectorVariablewiseFunction\nScalarAffineFunction\nVectorAffineFunction\nScalarQuadraticFunction\nVectorQuadraticFunctionList of function modifications.ScalarConstantChange"
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
    "location": "apireference.html#MathOptInterface.NonNegatives",
    "page": "Reference",
    "title": "MathOptInterface.NonNegatives",
    "category": "Type",
    "text": "NonNegatives(dim)\n\nThe nonnegative orthant  x in mathbbR^dim  x ge 0  of dimension dim.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.NonPositives",
    "page": "Reference",
    "title": "MathOptInterface.NonPositives",
    "category": "Type",
    "text": "NonPositives(dim)\n\nThe nonpositive orthant  x in mathbbR^dim  x le 0  of dimension dim.\n\n\n\n"
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
    "location": "apireference.html#MathOptInterface.Integers",
    "page": "Reference",
    "title": "MathOptInterface.Integers",
    "category": "Type",
    "text": "Integers()\n\nThe set of integers mathbbZ.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ZeroOne",
    "page": "Reference",
    "title": "MathOptInterface.ZeroOne",
    "category": "Type",
    "text": "ZeroOne()\n\nThe set  0 1 .\n\n\n\n"
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
    "text": "dimension(s::AbstractSet)\n\nReturn the dimension (number of vector components) in the set s.\n\n\n\n"
},

{
    "location": "apireference.html#Sets-1",
    "page": "Reference",
    "title": "Sets",
    "category": "section",
    "text": "List of recognized sets.AbstractSet\nReals\nZeros\nNonNegatives\nNonPositives\nGreaterThan\nLessThan\nInterval\nSecondOrderCone\nExponentialCone\nDualExponentialCone\nPowerCone\nDualPowerCone\nPositiveSemidefiniteConeTriangle\nPositiveSemidefiniteConeScaled\nIntegers\nZeroOne\nSOS1\nSOS2Functions for getting and setting properties of sets.dimension"
},

{
    "location": "apireference.html#MathOptInterface.setobjective!",
    "page": "Reference",
    "title": "MathOptInterface.setobjective!",
    "category": "Function",
    "text": "setobjective!(m::AbstractSolverInstance, func::F)\n\nSet the objective function in the solver instance m to be f(x) where f is a function specified by func.\n\n\n\n"
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
