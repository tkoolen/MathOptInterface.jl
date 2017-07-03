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
    "location": "apireference.html#MathOptInterface.SupportsQuadraticObjective",
    "page": "Reference",
    "title": "MathOptInterface.SupportsQuadraticObjective",
    "category": "Type",
    "text": "SupportsQuadraticObjective()\n\nA Bool indicating if the solver supports quadratic objectives.\n\n\n\n"
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
    "text": "AbstractSolverList of solver attributesReturnsDuals\nSupportsAddConstraintAfterSolve\nSupportsDeleteConstraint\nSupportsAddVariableAfterSolve\nSupportsQuadraticObjective\nSupportsConicThroughQuadratic"
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
    "text": "SolverInstance(solver::AbstractSolver)\n\nCreate a solver instance of AbstractSolverInstance using the given solver.\n\n\n\n"
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
    "location": "apireference.html#MathOptInterface.NumberOfVariablewiseConstraints",
    "page": "Reference",
    "title": "MathOptInterface.NumberOfVariablewiseConstraints",
    "category": "Type",
    "text": "NumberOfVariablewiseConstraints{T}()\n\nThe number of variablewise constraints of type T in the solver instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.NumberOfAffineConstraints",
    "page": "Reference",
    "title": "MathOptInterface.NumberOfAffineConstraints",
    "category": "Type",
    "text": "NumberOfAffineConstraints{T}()\n\nThe number of affine constraints of type T in the solver instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.NumberOfQuadraticConstraints",
    "page": "Reference",
    "title": "MathOptInterface.NumberOfQuadraticConstraints",
    "category": "Type",
    "text": "NumberOfQuadraticConstraints{T}()\n\nThe number of quadratic constraints of type T in the solver instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ResultCount",
    "page": "Reference",
    "title": "MathOptInterface.ResultCount",
    "category": "Type",
    "text": "ResultCount()\n\nThe number of results available.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ObjectiveValue",
    "page": "Reference",
    "title": "MathOptInterface.ObjectiveValue",
    "category": "Type",
    "text": "ObjectiveValue(resultidx::Int=1, objectiveindex::Int=1)\n\nThe objective value of the resultindexth primal result of the objectiveindexth objective.\n\nBoth resultindex and objectiveindex default to 1.\n\n\n\n"
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
    "text": "AbstractSolverInstanceSolverInstance\noptimize!\nfree!List of solver instance attributesRawSolver\nSense\nNumberOfVariables\nNumberOfVariablewiseConstraints\nNumberOfAffineConstraints\nNumberOfQuadraticConstraints\nResultCount\nObjectiveValue\nObjectiveBound\nRelativeGap\nSolveTime\nSimplexIterations\nBarrierIterations\nNodeCount\nTerminationStatus\nPrimalStatus\nDualStatus"
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
    "location": "apireference.html#MathOptInterface.candelete-Tuple{MathOptInterface.AbstractSolverInstance,MathOptInterface.VariableReference}",
    "page": "Reference",
    "title": "MathOptInterface.candelete",
    "category": "Method",
    "text": "candelete(m::AbstractSolverInstance, ref::VariableReference)::Bool\n\nReturn a Bool indicating whether this variable can be removed from the solver instance m.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.isvalid-Tuple{MathOptInterface.AbstractSolverInstance,MathOptInterface.VariableReference}",
    "page": "Reference",
    "title": "MathOptInterface.isvalid",
    "category": "Method",
    "text": "isvalid(m::AbstractSolverInstance, ref::VariableReference)::Bool\n\nReturn a Bool indicating whether this reference is valid for an active variable in the solver instance m.\n\n\n\n"
},

{
    "location": "apireference.html#Base.delete!-Tuple{MathOptInterface.AbstractSolverInstance,MathOptInterface.VariableReference}",
    "page": "Reference",
    "title": "Base.delete!",
    "category": "Method",
    "text": "delete!(m::AbstractSolverInstance, ref::VariableReference)\n\nDelete the referenced variable from the solver instance.\n\ndelete!(m::AbstractSolverInstance, refs::Vector{VariableReference})\n\nDelete the referenced variables in the vector refs from the solver instance.\n\n\n\n"
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
    "text": "Variable references and functions for adding and deleting variables.[attribute that points to the (scalar) variable domain??? eg GreaterThan, NonNegatives, ZeroOne, SemiInteger]VariableReference\ncandelete(::AbstractSolverInstance,::VariableReference)\nisvalid(::AbstractSolverInstance,::VariableReference)\ndelete!(::AbstractSolverInstance,::VariableReference)\naddvariables!\naddvariable!List of attributes associated with variables. [category AbstractVariableAttribute] Calls to getattribute and setattribute! should include as an argument a single VariableReference or a vector of VariableReference objects.VariablePrimalStart\nVariablePrimal\nVariableBasisStatus"
},

{
    "location": "apireference.html#MathOptInterface.VariablewiseConstraintReference",
    "page": "Reference",
    "title": "MathOptInterface.VariablewiseConstraintReference",
    "category": "Type",
    "text": "VariablewiseConstraintReference{T}\n\nA lightweight object used to reference variablewise constraints in a solver instance. The parameter T is the type of set constraint referenced.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.AffineConstraintReference",
    "page": "Reference",
    "title": "MathOptInterface.AffineConstraintReference",
    "category": "Type",
    "text": "AffineConstraintReference{T}\n\nA lightweight object used to reference affine-in-set constraints in a solver instance. The parameter T is the type of set constraint referenced.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.QuadraticConstraintReference",
    "page": "Reference",
    "title": "MathOptInterface.QuadraticConstraintReference",
    "category": "Type",
    "text": "QuadraticConstraintReference{T}\n\nA lightweight object used to reference quadratic-in-set constraints in a solver instance. The parameter T is the type of set constraint referenced.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.candelete-Tuple{MathOptInterface.AbstractSolverInstance,Union{MathOptInterface.AffineConstraintReference, MathOptInterface.QuadraticConstraintReference, MathOptInterface.VariablewiseConstraintReference}}",
    "page": "Reference",
    "title": "MathOptInterface.candelete",
    "category": "Method",
    "text": "candelete(m::AbstractSolverInstance, ref::ConstraintReference)::Bool\n\nReturn a Bool indicating whether this constraint can be removed from the solver instance m.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.isvalid-Tuple{MathOptInterface.AbstractSolverInstance,Union{MathOptInterface.AffineConstraintReference, MathOptInterface.QuadraticConstraintReference, MathOptInterface.VariablewiseConstraintReference}}",
    "page": "Reference",
    "title": "MathOptInterface.isvalid",
    "category": "Method",
    "text": "isvalid(m::AbstractSolverInstance, ref::ConstraintReference)::Bool\n\nReturn a Bool indicating whether this reference is valid for an active constraint in the solver instance m.\n\n\n\n"
},

{
    "location": "apireference.html#Base.delete!-Tuple{MathOptInterface.AbstractSolverInstance,Union{MathOptInterface.AffineConstraintReference, MathOptInterface.QuadraticConstraintReference, MathOptInterface.VariablewiseConstraintReference}}",
    "page": "Reference",
    "title": "Base.delete!",
    "category": "Method",
    "text": "delete!(m::AbstractSolverInstance, ref::ConstraintReference)\n\nDelete the referenced constraint from the solver instance.\n\ndelete!(m::AbstractSolverInstance, refs::Vector{ConstraintReference})\n\nDelete the referenced constraints in the vector refs from the solver instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.addconstraint!",
    "page": "Reference",
    "title": "MathOptInterface.addconstraint!",
    "category": "Function",
    "text": "addconstraint!(m::AbstractSolverInstance, b, a_constridx, a_v::Vector{VariableReference}, a_coef, Q_constridx, Q_vari::Vector{VariableReference}, Q_varj::Vector{VariableReference}, Q_coef, S::AbstractSet)::QuadraticConstraintReference{typeof(S)}\n\nAdd the vector quadratic-in-set constraint q_i(x) + A_i^T x + b_i in mathcalS_i, where:\n\nA_i is a sparse matrix specified in triplet form by a_constridx, a_v, a_coef\nb_i is a vector specified by b\nq_i(x) is a vector with component (q_i(x))_k defined as frac12 x^T Q_ik x, where each symmetric matrix Q_ik has Q_constridx equal to k and is specified in triplet form by Q_vari, Q_varj, Q_coef\nmathcalS_i is a pre-defined set specified as S\n\nDuplicate indices in either the A_i matrix or any Q_ik matrix are accepted and will be summed together. Off-diagonal entries of Q_ik will be mirrored, so either the upper triangular or lower triangular entries of Q_ik should be provided. If entries for both (ij) and (ji) are provided, these are considered duplicate terms. a_v, Q_vari, Q_varj should be collections of VariableReference objects.\n\naddconstraint!(m::AbstractSolverInstance, b, a_v::Vector{VariableReference}, a_coef, Q_vari::Vector{VariableReference}, Q_varj::Vector{VariableReference}, Q_coef, S::AbstractSet)::QuadraticConstraintReference{typeof(S)}\n\nAdd the scalar quadratic-in-set constraint q_i(x) + a_i^T x + b_i in mathcalS_i, where:\n\na_i is a sparse vector specified in tuple form by a_v, a_coef\nb_i is a scalar specified by b\nq_i(x) is defined as frac12 x^T Q_i x, where the symmetric matrix Q_i is specified in triplet form by Q_vari, Q_varj, Q_coef\nmathcalS_i is a pre-defined scalar set specified as S\n\nDuplicate indices in the a_i or the Q_ik are accepted and will be summed together.\n\naddconstraint!(m::AbstractSolverInstance, b, a_constridx, a_v::Vector{VariableReference}, a_coef, S::AbstractSet)::AffineConstraintReference{typeof(S)}\n\nAdd the vector affine-in-set constraint A_i^T x + b_i in mathcalS_i, where:\n\nA_i is a sparse matrix specified in triplet form by a_constridx, a_v, a_coef\nb_i is a vector specified by b\nmathcalS_i is a pre-defined set specified as S\n\nDuplicate indices in the A_i are accepted and will be summed together.\n\naddconstraint!(m::AbstractSolverInstance, b, a_v::Vector{VariableReference}, a_coef, S::AbstractSet)::AffineConstraintReference{typeof(S)}\n\nAdd the scalar affine-in-set constraint a_i^T x + b_i in mathcalS_i, where:\n\na_i is a sparse vector specified in tuple form by a_v, a_coef\nb_i is a scalar specified by b\nmathcalS_i is a pre-defined scalar set specified as S\n\nDuplicate indices in the a_i are accepted and will be summed together.\n\naddconstraint!(m::AbstractSolverInstance, vs::Vector{VariableReference}, S::AbstractSet)::VariablewiseConstraintReference{typeof(S)}\n\nAdd the vector variable-wise constraint (x_j)_j in v_i in mathcalS_i, where:\n\nv_i is a list of variable indices specified as a vector of variable references vs\nmathcalS_i is a pre-defined set specified as S\n\nBehavior is not defined for duplicate indices in the v_i.\n\naddconstraint!(m::AbstractSolverInstance, v::VariableReference, S::AbstractSet)::VariablewiseConstraintReference{typeof(S)}\n\nAdd the scalar variable-wise constraint x_j in mathcalS_i, where:\n\nx_j is variable specified as a variable reference v\nmathcalS_i is a pre-defined scalar set specified as S\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.modifyconstraint!",
    "page": "Reference",
    "title": "MathOptInterface.modifyconstraint!",
    "category": "Function",
    "text": "modifyconstraint!(m::AbstractSolverInstance, c::ConstraintReference, k::Int, args...)\n\nModify elements of the kth row of the constraint c depending on the arguments args. The kth row will have the form q_ik(x) + A_ik^T x + b_ik. There are four cases.\n\nModify Constant term\n\nmodifyconstraint!(m::AbstractSolverInstance, c::ConstraintReference, k::Int, b)\n\nSet the constant term of the kth row in the constraint c to b.\n\nExamples\n\nmodifyconstraint!(m, c, 1, 1.0)\n\nModify Linear term\n\nmodifyconstraint!(m::AbstractSolverInstance, c::ConstraintReference, k::Int, a_v::Vector{VariableReference}, a_coef)\n\nSet elements given by a_v in the linear term of the kth row in the constraint c to a_coef. Either a_v and a_coef are both singletons, or they should be collections with equal length. The behavior of duplicate entries in a_v is undefined.\n\nExamples\n\nmodifyconstraint!(m, c, v, 1.0)\nmodifyconstraint!(m, c, [v_1, v_2], [1.0, 2.0])\n\nModify Quadratic term\n\nmodifyconstraint!(m::AbstractSolverInstance, c::ConstraintReference, k::Int, Q_vari, Q_varj, Q_coef)\n\nSet the elements in the quadratic term of the kth row of the constraint c specified by the triplets Q_vari, Q_varj, Q_coef. Off-diagonal entries will be mirrored. Q_vari, Q_varj should be collections of VariableReference objects. The behavior of duplicate entries is undefined. If entries for both (ij) and (ji) are provided, these are considered duplicate terms.\n\nExamples\n\nmodifyconstraint!(m, c, v_1, v_2, 1.0)\nmodifyconstraint!(m, c, [v_1, v_2], [v_1, v_1], [1.0, 2.0])\n\nModify Set\n\nmodifyconstraint!(m::AbstractSolverInstance, c::ConstraintReference{Set}, S::Set)\n\nChange the set of constraint c to the new set S which should be of the same type as the original set.\n\nExamples\n\nIf c is a ConstraintReference{Interval}\n\nmodifyconstraint!(m, c, Interval(0, 5))\nmodifyconstraint!(m, c, NonPositives) # errors\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.getconstraintconstant",
    "page": "Reference",
    "title": "MathOptInterface.getconstraintconstant",
    "category": "Function",
    "text": "getconstraintconstant(m::AbstractSolverInstance, c::ConstraintReference)\n\nReturn the b vector of the constraint c.\n\ngetconstraintconstant(m::AbstractSolverInstance, c::ConstraintReference, k::Int)\n\nReturn the constant term of the kth row of the constraint c.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.getconstraintaffine",
    "page": "Reference",
    "title": "MathOptInterface.getconstraintaffine",
    "category": "Function",
    "text": "getconstraintaffine(m::AbstractSolverInstance, c::ConstraintReference)\n\nReturn the A_i matrix of the constraint corresponding to c in triplet form (i, v, coef), where v is a VariableReference, and coef is a coefficient value. Output is a tuple of three vectors.\n\ngetconstraintaffine(m::AbstractSolverInstance, c::ConstraintReference, k::Int)\n\nReturn the kth row of the A_k matrix of the constraint corresponding to c in tuple form (v, coef), where v is a VariableReference, and coef is a coefficient value. Output is a tuple of two vectors.\n\ngetconstraintaffine(m::AbstractSolverInstance, c::ConstraintReference, k::Int, v::VariableReference)\n\nReturn the element of the A_k matrix of the constraint corresponding to c in row k and variable v.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.getconstraintquadratic",
    "page": "Reference",
    "title": "MathOptInterface.getconstraintquadratic",
    "category": "Function",
    "text": "getconstraintquadratic(m::AbstractSolverInstance, c::ConstraintReference, k::Int)\n\nReturn the Q_ik matrix of the kth row of the constraint corresponding to c in triplet form (v_1, v_2, coef), where v_1, v_2 are VariableReferences, and coef is a coefficient value. Output is a tuple of three vectors. The Q_ik matrix must be symmetric, and only one element is returned.\n\ngetconstraintquadratic(m::AbstractSolverInstance, c::ConstraintReference, k::Int, v_1::VariableReference, v_2::VariableReference)\n\nReturn the element corresponding to (v_1, v_2) of the Q_ik matrix of the kth row of the constraint corresponding to c.\n\n\n\n"
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
    "location": "apireference.html#Constraints-1",
    "page": "Reference",
    "title": "Constraints",
    "category": "section",
    "text": "Constraint references and functions for adding, modifying, and removing constraints.VariablewiseConstraintReference\nAffineConstraintReference\nQuadraticConstraintReference\ncandelete(::AbstractSolverInstance,::ConstraintReference)\nisvalid(::AbstractSolverInstance,::ConstraintReference)\ndelete!(::AbstractSolverInstance,::ConstraintReference)\naddconstraint!\nmodifyconstraint!\ngetconstraintconstant\ngetconstraintaffine\ngetconstraintquadraticList of attributes associated with constraints. [category AbstractConstraintAttribute] Calls to getattribute and setattribute! should include as an argument a single ConstraintReference or a vector of ConstraintReference{T} objects.ConstraintPrimalStart\nConstraintDualStart\nConstraintPrimal\nConstraintDual\nConstraintBasisStatus"
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
    "text": "setobjective!(m::AbstractSolverInstance, b, a_varref::Vector{VariableReference}, a_coef, Q_vari::Vector{VariableReference}, Q_varj::Vector{VariableReference}, Q_coef, N::Int=1)\n\nSet the Nth objective in the solver instance m to be frac12 x^T Q_0 x + a_0^T x + b_0, where:\n\na_0 is a sparse vector specified in tuple form by a_varref, a_coef\nb_0 is a scalar\nthe symmetric matrix Q_0 is defined by the triplets in Q_vari, Q_varj, Q_coef\n\nDuplicate indices (sparse) in either the a_0 vector or the Q_0 matrix are accepted and will be summed together. Off-diagonal entries of Q_0 will be mirrored, so either the upper triangular or lower triangular entries of Q_0 should be provided. If entries for both (ij) and (ji) are provided, these are considered duplicate terms. a_varref, Q_vari, Q_varj should be collections of VariableReference objects.\n\nsetobjective!(m::AbstractSolverInstance, b, a_varref::Vector{VariableReference}, a_coef, N::Int=1)\n\nSet the Nth objective in the solver instance m to be a_0^T x + b_0, where:\n\na_0 is a sparse vector specified in tuple form by a_varref, a_coef\nb_0 is a scalar\n\nDuplicate indices (sparse) in either the a_0 vector or the Q_0 matrix are accepted and will be summed together.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.modifyobjective!",
    "page": "Reference",
    "title": "MathOptInterface.modifyobjective!",
    "category": "Function",
    "text": "modifyobjective!(m::AbstractSolverInstance, N::Int, args...)\n\nModify elements of the Nth objective depending on the arguments args. The Nth objective has the form frac12 x^T Q_0 x + a_0^T x + b_0.\n\nThere are three cases, below.\n\nModify Constant term\n\nmodifyobjective!(m::AbstractSolverInstance, N::Int, b)\n\nSet the constant term b_0 of the Nth objective to b.\n\nExamples\n\nmodifyobjective!(m, 1, 1.0)\n\nModify Linear term\n\nmodifyobjective!(m::AbstractSolverInstance, N::Int, a_varidx, a_coef)\n\nSet elements given by a_varidx in the linear term of the Nth objective to a_coef. Either a_varidx and a_coef are both singletons, or they should be collections with equal length. The behavior of duplicate entries in a_varidx is undefined.\n\nExamples\n\nmodifyobjective!(m, 1, v, 1.0)\nmodifyobjective!(m, 1, [v1, v2], [1.0, 2.0])\n\nModify Quadratic term\n\nmodifyobjective!(m::AbstractSolverInstance, N::Int, Q_vari, Q_varj, Q_coef)\n\nSet the elements in the quadratic term of the Nth objective specified by the triplets Q_vari, Q_varj, Q_coef. Off-diagonal entries will be mirrored. Q_vari, Q_varj should be collections of VariableReference objects. The behavior of duplicate entries is undefined. If entries for both (ij) and (ji) are provided, these are considered duplicate terms.\n\nExamples\n\nmodifyobjective!(m, 1, v1, v2, 1.0)\nmodifyobjective!(m, 1, [v1, v2], [v1, v1], [1.0, 2.0])\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.getobjectiveconstant",
    "page": "Reference",
    "title": "MathOptInterface.getobjectiveconstant",
    "category": "Function",
    "text": "getobjectiveconstant(m, N::Int=1)\n\nReturn the constant term in the Nth objective.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.getobjectiveaffine",
    "page": "Reference",
    "title": "MathOptInterface.getobjectiveaffine",
    "category": "Function",
    "text": "getobjectiveaffine(m, N::Int=1)\n\nReturn the affine part of the Nth objective in tuple form (varref, coef) where varref is a VariableReference and coef is a coefficient. Output is a tuple of two vectors.\n\ngetobjectiveaffine(m, v::VariableReference, N::Int=1)\n\nReturn the coefficient for the variable v in the affine part of the Nth objective.\n\n\n\n"
},

{
    "location": "apireference.html#Objectives-1",
    "page": "Reference",
    "title": "Objectives",
    "category": "section",
    "text": "Functions for adding and modifying objectives.setobjective!\nmodifyobjective!\ngetobjectiveconstant\ngetobjectiveaffine"
},

]}
