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
    "text": "Each mathematical optimization solver API has its own concepts and data structures for representing optimization instances and obtaining results. However, it is often desirable to represent an instance of an optimization problem at a higher level so that it is easy to try using different solvers. MathOptInterface (MOI) is an abstraction layer designed to provide a unified interface to mathematical optimization solvers so that users do not need to understand multiple solver-specific APIs. MOI can be used directly, or through a higher-level modeling interface like JuMP.MOI has been designed to replace MathProgBase, which has been used by modeling packages such as JuMP and Convex.jl. This second-generation abstraction layer addresses a number of limitations of MathProgBase. MOI is designed to:Be simple and extensible, unifying linear, quadratic, and conic optimization, and seamlessly facilitate extensions to essentially arbitrary constraints and functions (e.g., indicator constraints, complementarity constraints, and piecewise linear functions)\nBe fast by allowing access to a solver's in-memory representation of a problem without writing intermediate files (when possible) and by using multiple dispatch and avoiding requiring containers of nonconcrete types\nAllow a solver to return multiple results (e.g., a pool of solutions)\nAllow a solver to return extra arbitrary information via attributes (e.g., variable- and constraint-wise membership in an irreducible inconsistent subset for infeasibility analysis)\nProvide a greatly expanded set of status codes explaining what happened during the optimization procedure\nEnable a solver to more precisely specify which problem classes it supports\nEnable both primal and dual warm starts\nEnable adding and removing both variables and constraints by using reference objects instead of integer indices\nEnable any modification that the solver supports to an existing instance\nAvoid requiring the solver wrapper to store an additional copy of the problem dataThis manual introduces the concepts needed to understand MOI and give a high-level picture of how all of the pieces fit together. The primary focus is on MOI from the perspective of a user of the interface. At the end of the manual we have a section on Implementing a solver interface. The API Reference page lists the complete API.MOI does not export functions, but for brevity we often omit qualifying names with the MOI module. Best practice is to haveusing MathOptInterface\nconst MOI = MathOptInterfaceand prefix all MOI methods with MOI. in user code. If a name is also available in base Julia, we always explicitly use the module prefix, for example, with MOI.get."
},

{
    "location": "apimanual.html#Standard-form-problem-1",
    "page": "Manual",
    "title": "Standard form problem",
    "category": "section",
    "text": "The standard form problem is:beginalign\n     min_x in mathbbR^n  f_0(x)\n    \n     textst  f_i(x)  in mathcalS_i  i = 1 ldots m\nendalignwhere:the functions f_0 f_1 ldots f_m are specified by AbstractFunction objects\nthe sets mathcalS_1 ldots mathcalS_m are specified by AbstractSet objectsThe current function types are:projection onto a single coordinate: x_j, a single variable defined by a variable reference\nprojection onto multiple coordinates: a subvector of variables defined by a list of variable references\nscalar-valued affine: a^T x + b, where a is a vector and b scalar\nvector-valued affine: A x + b, where A is a matrix and b is a vector\nscalar-valued quadratic: frac12 x^T Q x + a^T x + b, where Q is a symmetric matrix, a is a vector, and b is a constant\nvector-valued quadratic: a vector of scalar-valued quadratic expressionsIn a future version, MOI could be extended to cover functions defined by evaluation oracles (e.g., for nonlinear derivative-based optimization).MOI defines some commonly used sets, but the interface is extensible to other sets recognized by the solver. [Describe currently supported sets.]"
},

{
    "location": "apimanual.html#Instances-1",
    "page": "Manual",
    "title": "Instances",
    "category": "section",
    "text": "An Instance (AbstractInstance) is a representation of a concrete instance of an optimization problem, i.e., with all data specified.  Instances are either standalone instances or solver instances:A Standalone Instance (AbstractStandaloneInstance) is unattached to any particular solver. It is simply a type that stores the data for an instance, which may be used for reading or writing optimization problems to files or manipulating a problem before providing it to a solver. The MathOptInterfaceUtilities package provides an implementation of a standalone instance.\nA Solver Instance (AbstractSolverInstance) should be understood as the representation of an instance of an optimization problem loaded in the solver's API. That is, the instance data is often (i.e., whenever possible) stored exclusively in the external API, not duplicated in the MOI translation layer (called the MOI wrapper). Hence, the ability to modify data in a solver instance depends on whether the solver's own API supports such modifications. Solver instances were designed to allow efficient incremental instance construction and modification, e.g., when solving in a loop.Instances share a common API for constructing the problem and querying its data. Solver instances, additionally, provide methods to solve the attached instance and query the results.Through the rest of the manual, instance is used as a generic solver instance.[Discuss how instances are constructed, solver parameters.]"
},

{
    "location": "apimanual.html#Variables-1",
    "page": "Manual",
    "title": "Variables",
    "category": "section",
    "text": "All variables in MOI are scalar variables. New scalar variables are created with addvariable! or addvariables!, which return a VariableReference or Vector{VariableReference} respectively. Integer indices are never used to reference variables.One uses VariableReference objects to set and get variable attributes. For example, the VariablePrimalStart attribute is used to provide an initial starting point for a variable or collection of variables:v = addvariable!(instance)\nset!(instance, VariablePrimalStart(), v, 10.5)\nv2 = addvariables!(instance, 3)\nset!(instance, VariablePrimalStart(), v2, [1.3,6.8,-4.6])A variable can be deleted from an instance with delete!(::AbstractInstance, ::VariableReference), if this functionality is supported."
},

{
    "location": "apimanual.html#Functions-1",
    "page": "Manual",
    "title": "Functions",
    "category": "section",
    "text": "MOI defines six functions as listed in the definition of the Standard form problem. The simplest function is SingleVariable defined as:struct SingleVariable <: AbstractFunction\n    variable::VariableReference\nendIf v is a VariableReference object, then SingleVariable(v) is simply the scalar-valued function from the complete set of variables in an instance that returns the value of variable v. One may also call this function a coordinate projection, which is more useful for defining constraints than as an objective function.A more interesting function is ScalarAffineFunction, defined asstruct ScalarAffineFunction{T} <: AbstractFunction\n    variables::Vector{VariableReference}\n    coefficients::Vector{T}\n    constant::T\nendIf x is a vector of VariableReference objects, then ScalarAffineFunction([x[1],x[2]],[5.0,-2.3],1.0) represents the function 5x_1 - 23x_2 + 1.Objective functions are assigned to an instance by setting the ObjectiveFunction attribute. The ObjectiveSense attribute is used for setting the optimization sense. For example,x = addvariables!(instance, 2)\nset!(instance, ObjectiveFunction(), ScalarAffineFunction([x[1],x[2]],[5.0,-2.3],1.0))\nset!(instance, ObjectiveSense(), MinSense)sets the objective to the function just discussed in the minimization sense.See Functions and function modifications for the complete list of functions."
},

{
    "location": "apimanual.html#Sets-1",
    "page": "Manual",
    "title": "Sets",
    "category": "section",
    "text": "All constraints are specified with addconstraint! by restricting the output of some function to a set. The interface allows an arbitrary combination of functions and sets, but of course solvers may decide to support only a small number of combinations.For example, linear programming solvers should support, at least, combinations of affine functions with the LessThan and GreaterThan sets. These are simply linear constraints. SingleVariable functions combined with these same sets are used to specify upper and lower bounds on variables.The code example below encodes the linear optimization problem:beginalign\n max_x in mathbbR^2  3x_1 + 2x_2 \n\n textst  x_1 + x_2 le 5\n\n x_1  ge 0\n\nx_2  ge -1\nendalignx = addvariables!(instance, 2)\nset!(instance, ObjectiveFunction(), ScalarAffineFunction(x, [3.0,2.0], 0.0))\nset!(instance, ObjectiveSense(), MaxSense)\naddconstraint!(instance, ScalarAffineFunction(x, [1.0,1.0], 0.0), LessThan(5.0))\naddconstraint!(instance, SingleVariable(x[1]), GreaterThan(0.0))\naddconstraint!(instance, SingleVariable(x[2]), GreaterThan(-1.0))[Example with vector-valued set.]"
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
    "text": "Mathematical Constraint MOI Function MOI Set\nlVert Ax + brVert_2 le c^Tx + d VectorAffineFunction SecondOrderCone\ny ge lVert x rVert_2 VectorOfVariables SecondOrderCone\n2yz ge lVert x rVert_2^2 yz ge 0 VectorOfVariables RotatedSecondOrderCone\n(a_1^Tx + b_1a_2^Tx + b_2a_3^Tx + b_3) in mathcalE VectorAffineFunction ExponentialCone\nA(x) in mathcalS_+ VectorAffineFunction PositiveSemidefiniteConeTriangle\nA(x) in mathcalS_+ VectorAffineFunction PositiveSemidefiniteConeSquare\nx in mathcalS_+ VectorOfVariables PositiveSemidefiniteConeTriangle\nx in mathcalS_+ VectorOfVariables PositiveSemidefiniteConeSquare[Define mathcalE (exponential cone), mathcalS_+ (smat), mathcalS_+ (svec). A(x) is an affine function of x that outputs a matrix.]"
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
    "text": "Mathematical Constraint MOI Function MOI Set\nx_i in mathbbZ SingleVariable Integer\nx_i in 01 SingleVariable ZeroOne\nx_i in 0 cup lu SingleVariable Semicontinuous\nx_i in 0 cup ll+1ldotsu-1u SingleVariable Semiinteger\nAt most one component of x can be nonzero VectorOfVariables SOS1\nAt most two components of x can be nonzero, and if so they must be adjacent components VectorOfVariables SOS2"
},

{
    "location": "apimanual.html#Solving-and-retrieving-the-results-1",
    "page": "Manual",
    "title": "Solving and retrieving the results",
    "category": "section",
    "text": "Once a solver instance is loaded with the objective function and all of the constraints, we can ask the solver to solve the instance by calling optimize!.optimize!(instance)The optimization procedure may terminate for a number of reasons. The TerminationStatus attribute of the solver instance returns a TerminationStatusCode object which explains why the solver stopped. Some statuses indicate generally successful termination, some termination because of limit, and some termination because of something unexpected like invalid problem data or failure to converge. A typical usage of the TerminationStatus attribute is as follows:status = MOI.get(instance, TerminationStatus())\nif status == Success\n    # Ok, the solver has a result to return\nelse\n    # Handle other cases\n    # The solver may or may not have a result\nendThe Success status code specifically implies that the solver has a \"result\" to return. In the case that the solver converged to an optimal solution, this result will just be the optimal solution vector. The PrimalStatus attribute returns a ResultStatusCode that explains how to interpret the result. In the case that the solver is known to return globally optimal solutions (up to numerical tolerances), the combination of Success termination status and FeasiblePoint primal result status implies that the primal result vector should be interpreted as a globally optimal solution. A result may be available even if the status is not Success, for example, if the solver stopped because of a time limit and has a feasible but nonoptimal solution. Use the ResultCount attribute to check if one or more results are available.In addition to the primal status, the DualStatus provides important information for primal-dual solvers.If a result is available, it may be retrieved with the VariablePrimal attribute:MOI.get(instance, VariablePrimal(), x)If x is a VariableRefrence then the function call returns a scalar, and if x is a Vector{VariableReference} then the call returns a vector of scalars. VariablePrimal() is equivalent to VariablePrimal(1), i.e., the variable primal vector of the first result. Use VariablePrimal(N) to access the Nth result.See also the attributes ConstraintPrimal, and ConstraintDual. See Duals for a discussion of the MOI conventions for primal-dual pairs and certificates."
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
    "location": "apimanual.html#A-complete-example:-solving-a-knapsack-problem-1",
    "page": "Manual",
    "title": "A complete example: solving a knapsack problem",
    "category": "section",
    "text": "[ needs formatting help, doc tests ]using MathOptInterface\nconst MOI = MathOptInterface\nusing MathOptInterfaceGLPK\n\n# Solve the binary-constrained knapsack problem: max c'x: w'x <= C, x binary using GLPK.\n\nc = [1.0, 2.0, 3.0]\nw = [0.3, 0.5, 1.0]\n\nnumvariables = length(c)\n\ninstance = GLPKInstance() # TODO: match with actual name in GLPK wrapper\n\n# create the variables in the problem\nx = MOI.addvariables!(instance, numvariables)\n\n# set the objective function\nMOI.set!(instance, MOI.ObjectiveFunction(), MOI.ScalarAffineFunction(x, c, 0.0))\nMOI.set!(instance, MOI.ObjectiveSense(), MOI.MaxSense)\n\n# add the knapsack constraint\nMOI.addconstraint!(instance, MOI.ScalarAffineFunction(x, w, 0.0), MOI.LessThan(C))\n\n# add integrality constraints\nfor i in 1:numvariables\n    MOI.addconstraint!(instance, MOI.SingleVariable(x[i]), MOI.ZeroOne())\nend\n\n# all set\nMOI.optimize!(instance)\n\ntermination_status = MOI.get(instance, TerminationStatus())\nobjvalue = MOI.canget(instance, MOI.ObjectiveValue()) ? MOI.get(instance, MOI.ObjectiveValue()) : NaN\nif termination_status != MOI.Success\n    error(\"Solver terminated with status $termination_status\")\nend\n\n@assert MOI.get(instance, MOI.ResultCount()) > 0\n\nresult_status = MOI.get(instance, MOI.PrimalStatus())\nif result_status != MOI.FeasiblePoint\n    error(\"Solver ran successfully did not return a feasible point. The problem may be infeasible.\")\nend\nprimal_variable_result = MOI.get(instance, MOI.VariablePrimal(), x)\n\n@show objvalue\n@show primal_variable_result"
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
    "location": "apimanual.html#Duality-and-scalar-product-1",
    "page": "Manual",
    "title": "Duality and scalar product",
    "category": "section",
    "text": "The scalar product is different from the canonical one for the sets PositiveSemidefiniteConeTriangle, LogDetConeTriangle, RootDetConeTriangle. If the set C_i of the section Duals is one of these three cones, then the rows of the matrix A_i corresponding to off-diagonal entries are twice the value of the coefficients field in the VectorAffineFunction for the corresponding rows. See PositiveSemidefiniteConeTriangle for details."
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
    "text": "[The interface is designed for multiple dispatch, e.g., attributes, combinations of sets and functions.][Avoid storing extra copies of the problem when possible.]MOI defines a very general interface, with multiple possible ways to describe the same constraint. This is considered a feature, not a bug. MOI is designed to make it possible to experiment with alternative representations of an optimization problem at both the solving and modeling level. When implementing an interface, it is important to keep in mind that the constraints which a solver supports via MOI will have a near 1-to-1 correspondence with how users can express problems in JuMP, because JuMP does not perform automatic transformations. (Alternative systems like Convex.jl do.) For example, if a solver wrapper does not support ScalarAffineFunction-in-LessThan constraints, then users will not be able to write: @constraint(m, 2x + y <= 10) in JuMP. That said, from the perspective of JuMP, solvers can safely choose to not support the following constraints:ScalarAffineFunction in GreaterThan, LessThan, or EqualTo with a nonzero constant in the function. Constants in the affine function should instead be moved into the parameters of the corresponding sets.\nScalarAffineFunction in Nonnegative, Nonpositive or Zeros. Alternative constraints are available by using a VectorAffineFunction with one output row or ScalarAffineFunction with GreaterThan, LessThan, or EqualTo.\nTwo SingleVariable-in-LessThan constraints applied to the same variable (similarly with GreaterThan). These should be interpreted as variable bounds, and each variable naturally has at most one upper or lower bound.There is no special interface for column generation. If the solver has a special API for setting coefficients in existing constraints when adding a new variable, it is possible to queue modifications and new variables and then call the solver's API once all of the new coefficients are known.All data passed to the solver should be copied immediately to internal data structures. Solvers may not modify any input vectors and should not assume that input vectors will not be modified by users in the future. This applies, for example, to the coefficient vector in ScalarAffineFunction. Vectors returned to the user, e.g., via ObjectiveFunction or ConstraintFunction attributes should not be modified by the solver afterwards. The in-place version of get! can be used by users to avoid extra copies in this case.Solver wrappers should document how the low-level solver statuses map to the MOI statuses. In particular, the characterization of a result with status FeasiblePoint and termination status Success is entirely solver defined. It may or may not be a globally optimal solution. Solver wrappers are not responsible for verifying the feasibility of results. Statuses like NearlyFeasiblePoint, InfeasiblePoint, NearlyInfeasiblePoint, and NearlyReductionCertificate are designed to be used when the solver explicitly indicates as much.MOI solver interfaces may be in the same package as the solver itself (either the C wrapper if the solver is accessible through C, or the Julia code if the solver is written in Julia, for example). In some cases it may be more appropriate to host the MOI wrapper in its own package; in this case it is recommended that the MOI wrapper package be named MathOptInterfaceXXX where XXX is the solver name."
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
    "location": "apireference.html#MathOptInterface.AbstractInstanceAttribute",
    "page": "Reference",
    "title": "MathOptInterface.AbstractInstanceAttribute",
    "category": "Type",
    "text": "AbstractInstanceAttribute\n\nAbstract supertype for attribute objects that can be used to set or get attributes (properties) of the instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.AbstractVariableAttribute",
    "page": "Reference",
    "title": "MathOptInterface.AbstractVariableAttribute",
    "category": "Type",
    "text": "AbstractVariableAttribute\n\nAbstract supertype for attribute objects that can be used to set or get attributes (properties) of variables in the instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.AbstractConstraintAttribute",
    "page": "Reference",
    "title": "MathOptInterface.AbstractConstraintAttribute",
    "category": "Type",
    "text": "AbstractConstraintAttribute\n\nAbstract supertype for attribute objects that can be used to set or get attributes (properties) of constraints in the instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.canget",
    "page": "Reference",
    "title": "MathOptInterface.canget",
    "category": "Function",
    "text": "canget(instance::AbstractInstance, attr::AbstractVariableAttribute, v::VariableReference)::Bool\ncanget(instance::AbstractInstance, attr::AbstractConstraintAttribute, c::ConstraintReference{F,S})::Bool\n\nReturn a Bool indicating whether the instance instance currently has a value for the attributed specified by attribute type attr applied to the variable reference v or constraint reference c.\n\ncanget(instance::AbstractInstance, attr::AbstractVariableAttribute, v::Vector{VariableReference})::Bool\ncanget(instance::AbstractInstance, attr::AbstractConstraintAttribute, c::Vector{ConstraintReference{F,S}})::Bool\n\nReturn a Bool indicating whether the instance instance currently has a value for the attributed specified by attribute type attr applied to every variable references in v or constraint reference in c.\n\ncanget(instance::AbstractInstance, ::Type{VariableReference}, name::String)::Bool\n\nReturn a Bool indicating if a variable with the name name exists in the instance.\n\ncanget(instance::AbstractInstance, ::Type{ConstraintReference{F,S}}, name::String)::Bool where {F<:AbstractFunction,S<:AbstractSet}\n\nReturn a Bool indicating if an F-in-S constraint with the name name exists in the instance instance.\n\ncanget(instance::AbstractInstance, ::Type{ConstraintReference}, name::String)::Bool\n\nReturn a Bool indicating if a constraint of any kind with the name name exists in the instance instance.\n\nExamples\n\ncanget(instance, ObjectiveValue())\ncanget(instance, VariablePrimalStart(), varref)\ncanget(instance, ConstraintPrimal(), conref)\ncanget(instance, VariablePrimal(), [ref1, ref2])\ncanget(instance, VariableReference, \"var1\")\ncanget(instance, ConstraintReference{ScalarAffineFunction{Float64},LessThan{Float64}}, \"con1\")\ncanget(instance, ConstraintReference, \"con1\")\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.get",
    "page": "Reference",
    "title": "MathOptInterface.get",
    "category": "Function",
    "text": "get(instance::AbstractInstance, attr::AbstractInstanceAttribute)\n\nReturn an attribute attr of the instance instance.\n\nget(instance::AbstractInstance, attr::AbstractVariableAttribute, v::VariableReference)\n\nReturn an attribute attr of the variable v in instance instance.\n\nget(instance::AbstractInstance, attr::AbstractVariableAttribute, v::Vector{VariableReference})\n\nReturn a vector of attributes corresponding to each variable in the collection v in the instance instance.\n\nget(instance::AbstractInstance, attr::AbstractConstraintAttribute, c::ConstraintReference)\n\nReturn an attribute attr of the constraint c in instance instance.\n\nget(instance::AbstractInstance, attr::AbstractConstraintAttribute, c::Vector{ConstraintReference{F,S}})\n\nReturn a vector of attributes corresponding to each constraint in the collection c in the instance instance.\n\nget(instance::AbstractInstance, ::Type{VariableReference}, name::String)\n\nIf a variable with name name exists in the instance instance, return the corresponding reference object, otherwise throw a KeyError.\n\nget(instance::AbstractInstance, ::Type{ConstraintReference{F,S}}, name::String) where {F<:AbstractFunction,S<:AbstractSet}\n\nIf an F-in-S constraint with name name exists in the instance instance, return the corresponding reference object, otherwise throw a KeyError.\n\nget(instance::AbstractInstance, ::Type{ConstraintReference}, name::String)\n\nIf any constraint with name name exists in the instance instance, return the corresponding reference object, otherwise throw a KeyError. This version is available for convenience but may incur a performance penalty because it is not type stable.\n\nExamples\n\nget(instance, ObjectiveValue())\nget(instance, VariablePrimal(), ref)\nget(instance, VariablePrimal(5), [ref1, ref2])\nget(instance, OtherAttribute(\"something specific to cplex\"))\nget(instance, VariableReference, \"var1\")\nget(instance, ConstraintReference{ScalarAffineFunction{Float64},LessThan{Float64}}, \"con1\")\nget(instance, ConstraintReference, \"con1\")\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.get!",
    "page": "Reference",
    "title": "MathOptInterface.get!",
    "category": "Function",
    "text": "get!(output, instance::AbstractInstance, args...)\n\nAn in-place version of get. The signature matches that of get except that the the result is placed in the vector output.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.canset",
    "page": "Reference",
    "title": "MathOptInterface.canset",
    "category": "Function",
    "text": "canset(instance::AbstractInstance, attr::AbstractVariableAttribute, R::Type{VariableReference})::Bool\ncanget(instance::AbstractInstance, attr::AbstractConstraintAttribute, R::Type{ConstraintReference{F,S})::Bool\n\nReturn a Bool indicating whether it is possible to set attribute attr applied to the reference type R in the instance instance.\n\ncanset(instance::AbstractInstance, attr::AbstractVariableAttribute, v::Vector{VariableReference})::Bool\ncanset(instance::AbstractInstance, attr::AbstractConstraintAttribute, c::Vector{ConstraintReference{F,S}})::Bool\n\nReturn a Bool indicating whether it is possible to set attribute attrapplied to every variable reference in v or constraint reference in c in the instance instance.\n\nExamples\n\ncanset(instance, ObjectiveValue())\ncanset(instance, VariablePrimalStart(), VariableReference)\ncanset(instance, ConstraintPrimal(), ConstraintReference{VectorAffineFunction{Float64},Nonnegatives})\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.set!",
    "page": "Reference",
    "title": "MathOptInterface.set!",
    "category": "Function",
    "text": "set!(instance::AbstractInstance, attr::AbstractInstanceAttribute, value)\n\nAssign value to the attribute attr of the instance instance.\n\nset!(instance::AbstractInstance, attr::AbstractVariableAttribute, v::VariableReference, value)\n\nAssign value to the attribute attr of variable v in instance instance.\n\nset!(instance::AbstractInstance, attr::AbstractVariableAttribute, v::Vector{VariableReference}, vector_of_values)\n\nAssign a value respectively to the attribute attr of each variable in the collection v in instance instance.\n\nset!(instance::AbstractInstance, attr::AbstractConstraintAttribute, c::ConstraintReference, value)\n\nAssign a value to the attribute attr of constraint c in instance instance.\n\nset!(instance::AbstractInstance, attr::AbstractConstraintAttribute, c::Vector{ConstraintReference{F,S}})\n\nAssign a value respectively to the attribute attr of each constraint in the collection c in instance instance.\n\n\n\n"
},

{
    "location": "apireference.html#Attributes-1",
    "page": "Reference",
    "title": "Attributes",
    "category": "section",
    "text": "List of attribute categories.AbstractInstanceAttribute\nAbstractVariableAttribute\nAbstractConstraintAttributeFunctions for getting and setting attributes.canget\nget\nget!\ncanset\nset!"
},

{
    "location": "apireference.html#MathOptInterface.AbstractInstance",
    "page": "Reference",
    "title": "MathOptInterface.AbstractInstance",
    "category": "Type",
    "text": "AbstractInstance\n\nAbstract supertype for objects representing an instance of an optimization problem.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.AbstractStandaloneInstance",
    "page": "Reference",
    "title": "MathOptInterface.AbstractStandaloneInstance",
    "category": "Type",
    "text": "AbstractStandaloneInstance\n\nAbstract supertype for objects representing an instance of an optimization problem unattached to any particular solver. Does not have methods for solving or querying results.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.AbstractSolverInstance",
    "page": "Reference",
    "title": "MathOptInterface.AbstractSolverInstance",
    "category": "Type",
    "text": "AbstractSolverInstance\n\nAbstract supertype for objects representing an instance of an optimization problem tied to a particular solver. This is typically a solver's in-memory representation. In addition to AbstractInstance, AbstractSolverInstance objects let you solve the instance and query the solution.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.write",
    "page": "Reference",
    "title": "MathOptInterface.write",
    "category": "Function",
    "text": "write(instance::AbstractInstance, filename::String)\n\nWrites the current instance data to the given file. Supported file types depend on the solver or standalone instance type.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.read!",
    "page": "Reference",
    "title": "MathOptInterface.read!",
    "category": "Function",
    "text": "read!(instance::AbstractInstance, filename::String)\n\nRead the file filename into the instance instance. If m is non-empty, this may throw an error.\n\nSupported file types depend on the instance type.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.copy!",
    "page": "Reference",
    "title": "MathOptInterface.copy!",
    "category": "Function",
    "text": "copy!(dest::AbstractInstance, src::AbstractInstance)\n\nCopy the model from the instance src into the instance dest. If dest is non-empty, this may throw an error.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.Name",
    "page": "Reference",
    "title": "MathOptInterface.Name",
    "category": "Type",
    "text": "Name()\n\nA string identifying the instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ObjectiveSense",
    "page": "Reference",
    "title": "MathOptInterface.ObjectiveSense",
    "category": "Type",
    "text": "ObjectiveSense()\n\nThe sense of the objective function, an OptimizationSense with value MinSense, MaxSense, or FeasiblitySense.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.NumberOfVariables",
    "page": "Reference",
    "title": "MathOptInterface.NumberOfVariables",
    "category": "Type",
    "text": "NumberOfVariables()\n\nThe number of variables in the instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ListOfVariableReferences",
    "page": "Reference",
    "title": "MathOptInterface.ListOfVariableReferences",
    "category": "Type",
    "text": "ListOfVariableReferences()\n\nA Vector{VariableReference} with references to all variables present in the instance (i.e., of length equal to the value of NumberOfVariables()).\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ListOfConstraints",
    "page": "Reference",
    "title": "MathOptInterface.ListOfConstraints",
    "category": "Type",
    "text": "ListOfConstraints()\n\nA list of tuples of the form (F,S), where F is a function type and S is a set type indicating that the attribute NumberOfConstraints{F,S}() has value greater than zero.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.NumberOfConstraints",
    "page": "Reference",
    "title": "MathOptInterface.NumberOfConstraints",
    "category": "Type",
    "text": "NumberOfConstraints{F,S}()\n\nThe number of constraints of the type F-in-S present in the instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ListOfConstraintReferences",
    "page": "Reference",
    "title": "MathOptInterface.ListOfConstraintReferences",
    "category": "Type",
    "text": "ListOfConstraintReferences{F,S}()\n\nA Vector{ConstraintReferences{F,S}} with references to all constraints of type F-inS in the instance (i.e., of length equal to the value of NumberOfConstraints{F,S}()).\n\n\n\n"
},

{
    "location": "apireference.html#Instance-1",
    "page": "Reference",
    "title": "Instance",
    "category": "section",
    "text": "AbstractInstance\nAbstractStandaloneInstance\nAbstractSolverInstance\nwrite\nread!\ncopy!List of instance attributesName\nObjectiveSense\nNumberOfVariables\nListOfVariableReferences\nListOfConstraints\nNumberOfConstraints\nListOfConstraintReferencesThere are no attributes specific to a standalone instance."
},

{
    "location": "apireference.html#MathOptInterface.optimize!",
    "page": "Reference",
    "title": "MathOptInterface.optimize!",
    "category": "Function",
    "text": "optimize!(instance::AbstractSolverInstance)\n\nStart the solution procedure.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.free!",
    "page": "Reference",
    "title": "MathOptInterface.free!",
    "category": "Function",
    "text": "free!(instance::AbstractSolverInstance)\n\nRelease any resources and memory used by the solver instance. Note that the Julia garbage collector takes care of this automatically, but automatic collection cannot always be forced. This method is useful for more precise control of resources, especially in the case of commercial solvers with licensing restrictions on the number of concurrent runs. Users must discard the solver instance object after this method is invoked.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.RawSolver",
    "page": "Reference",
    "title": "MathOptInterface.RawSolver",
    "category": "Type",
    "text": "RawSolver()\n\nAn object that may be used to access a solver-specific API for this solver instance.\n\n\n\n"
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
    "location": "apireference.html#Solver-instance-1",
    "page": "Reference",
    "title": "Solver instance",
    "category": "section",
    "text": "optimize!\nfree!List of solver instance attributesRawSolver\nResultCount\nObjectiveFunction\nObjectiveValue\nObjectiveBound\nRelativeGap\nSolveTime\nSimplexIterations\nBarrierIterations\nNodeCount\nTerminationStatus\nPrimalStatus\nDualStatus"
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
    "text": "VariableReference\n\nA lightweight object used to reference variables in an instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ConstraintReference",
    "page": "Reference",
    "title": "MathOptInterface.ConstraintReference",
    "category": "Type",
    "text": "ConstraintReference{F,S}\n\nA lightweight object used to reference F-in-S constraints in an instance. The parameter F is the type of the function in the constraint, and the parameter S is the type of set in the constraint.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.candelete",
    "page": "Reference",
    "title": "MathOptInterface.candelete",
    "category": "Function",
    "text": "candelete(instance::AbstractInstance, ref::AnyReference)::Bool\n\nReturn a Bool indicating whether the object referred to by ref can be removed from the instance instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.isvalid",
    "page": "Reference",
    "title": "MathOptInterface.isvalid",
    "category": "Function",
    "text": "isvalid(instance::AbstractInstance, ref::AnyReference)::Bool\n\nReturn a Bool indicating whether this reference refers to a valid object in the instance instance.\n\n\n\n"
},

{
    "location": "apireference.html#Base.delete!-Tuple{MathOptInterface.AbstractSolverInstance,Union{MathOptInterface.ConstraintReference, MathOptInterface.VariableReference}}",
    "page": "Reference",
    "title": "Base.delete!",
    "category": "Method",
    "text": "delete!(instance::AbstractInstance, ref::AnyReference)\n\nDelete the referenced object from the instance.\n\ndelete!{R}(instance::AbstractInstance, refs::Vector{R<:AnyReference})\n\nDelete the referenced objects in the vector refs from the instance. It may be assumed that R is a concrete type.\n\n\n\n"
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
    "text": "addvariables!(instance::AbstractInstance, n::Int)::Vector{VariableReference}\n\nAdd n scalar variables to the instance, returning a vector of variable references.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.addvariable!",
    "page": "Reference",
    "title": "MathOptInterface.addvariable!",
    "category": "Function",
    "text": "addvariable!(instance::AbstractInstance)::VariableReference\n\nAdd a scalar variable to the instance, returning a variable reference.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.VariableName",
    "page": "Reference",
    "title": "MathOptInterface.VariableName",
    "category": "Type",
    "text": "VariableName()\n\nA string identifying the variable. It is invalid for two variables to have the same name.\n\n\n\n"
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
    "text": "Functions for adding variables. For deleting, see references section.addvariables!\naddvariable!List of attributes associated with variables. [category AbstractVariableAttribute] Calls to get and set! should include as an argument a single VariableReference or a vector of VariableReference objects.VariableName\nVariablePrimalStart\nVariablePrimal\nVariableBasisStatus"
},

{
    "location": "apireference.html#MathOptInterface.isvalid-Tuple{MathOptInterface.AbstractSolverInstance,MathOptInterface.ConstraintReference}",
    "page": "Reference",
    "title": "MathOptInterface.isvalid",
    "category": "Method",
    "text": "isvalid(instance::AbstractInstance, ref::AnyReference)::Bool\n\nReturn a Bool indicating whether this reference refers to a valid object in the instance instance.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.canaddconstraint",
    "page": "Reference",
    "title": "MathOptInterface.canaddconstraint",
    "category": "Function",
    "text": "canaddconstraint(instance::AbstractInstance, func::AbstractFunction, set::AbstractSet)::Bool\n\nReturn a Bool indicating whether it is possible to add the constraint f(x) in mathcalS where f is defined by func, and mathcalS is defined by set.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.addconstraint!",
    "page": "Reference",
    "title": "MathOptInterface.addconstraint!",
    "category": "Function",
    "text": "addconstraint!(instance::AbstractInstance, func::F, set::S)::ConstraintReference{F,S} where {F,S}\n\nAdd the constraint f(x) in mathcalS where f is defined by func, and mathcalS is defined by set.\n\naddconstraint!(instance::AbstractInstance, v::VariableReference, set::S)::ConstraintReference{SingleVariable,S} where {S}\naddconstraint!(instance::AbstractInstance, vec::Vector{VariableReference}, set::S)::ConstraintReference{VectorOfVariables,S} where {S}\n\nAdd the constraint v in mathcalS where v is the variable (or vector of variables) referenced by v and mathcalS is defined by set.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.addconstraints!",
    "page": "Reference",
    "title": "MathOptInterface.addconstraints!",
    "category": "Function",
    "text": "addconstraints!(instance::AbstractInstance, funcs::Vector{F}, sets::Vector{S})::Vector{ConstraintReference{F,S}} where {F,S}\n\nAdd the set of constraints specified by each function-set pair in funcs and sets. F and S should be concrete types. This call is equivalent to addconstraint!.(instance, funcs, sets) but may be more efficient.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.modifyconstraint!",
    "page": "Reference",
    "title": "MathOptInterface.modifyconstraint!",
    "category": "Function",
    "text": "Modify Function\n\nmodifyconstraint!(instance::AbstractInstance, c::ConstraintReference{F,S}, func::F)\n\nReplace the function in constraint c with func. F must match the original function type used to define the constraint.\n\nExamples\n\nIf c is a ConstraintReference{ScalarAffineFunction,S} and v1 and v2 are VariableReference objects,\n\nmodifyconstraint!(instance, c, ScalarAffineFunction([v1,v2],[1.0,2.0],5.0))\nmodifyconstraint!(instance, c, SingleVariable(v1)) # Error\n\nModify Set\n\nmodifyconstraint!(instance::AbstractInstance, c::ConstraintReference{F,S}, set::S)\n\nChange the set of constraint c to the new set set which should be of the same type as the original set.\n\nExamples\n\nIf c is a ConstraintReference{F,Interval}\n\nmodifyconstraint!(instance, c, Interval(0, 5))\nmodifyconstraint!(instance, c, NonPositives) # Error\n\nPartial Modifications\n\nmodifyconstraint!(instance::AbstractInstance, c::ConstraintReference, change::AbstractFunctionModification)\n\nApply the modification specified by change to the function of constraint c.\n\nExamples\n\nmodifyconstraint!(instance, c, ScalarConstantChange(10.0))\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.canmodifyconstraint",
    "page": "Reference",
    "title": "MathOptInterface.canmodifyconstraint",
    "category": "Function",
    "text": "Modify Function\n\ncanmodifyconstraint(instance::AbstractInstance, c::ConstraintReference{F,S}, func::F)::Bool\n\nReturn a Bool indicating whether it is possible to replace the function in constraint c with func. F must match the original function type used to define the constraint.\n\nExamples\n\nIf c is a ConstraintReference{ScalarAffineFunction,S} and v1 and v2 are VariableReference objects,\n\ncanmodifyconstraint(instance, c, ScalarAffineFunction([v1,v2],[1.0,2.0],5.0))\ncanmodifyconstraint(instance, c, SingleVariable(v1)) # false\n\nModify Set\n\ncanmodifyconstraint(instance::AbstractInstance, c::ConstraintReference{F,S}, set::S)::Bool\n\nReturn a Bool indicating whether it is possible to change the set of constraint c to the new set set which should be of the same type as the original set.\n\nExamples\n\nIf c is a ConstraintReference{F,Interval}\n\ncanmodifyconstraint(instance, c, Interval(0, 5))\ncanmodifyconstraint(instance, c, NonPositives) # false\n\nPartial Modifications\n\ncanmodifyconstraint(instance::AbstractInstance, c::ConstraintReference, change::AbstractFunctionModification)::Bool\n\nReturn a Bool indicating whether it is possible to apply the modification specified by change to the function of constraint c.\n\nExamples\n\ncanmodifyconstraint(instance, c, ScalarConstantChange(10.0))\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.transformconstraint!",
    "page": "Reference",
    "title": "MathOptInterface.transformconstraint!",
    "category": "Function",
    "text": "Transform Constraint Set\n\ntransformconstraint!(instance::AbstractInstance, c::ConstraintReference{F,S1}, newset::S2)::ConstraintReference{F,S2}\n\nReplace the set in constraint c with newset. The constraint reference c will no longer be valid, and the function returns a new constraint reference.\n\nSolvers may only support a subset of constraint transforms that they perform efficiently (for example, changing from a LessThan to GreaterThan set). In addition, set modification (where S1 = S2) should be performed via the modifyconstraint! function.\n\nTypically, the user should delete the constraint and add a new one.\n\nExamples\n\nIf c is a ConstraintReference{ScalarAffineFunction{Float64},LessThan{Float64}},\n\nc2 = transformconstraint!(instance, c, GreaterThan(0.0))\ntransformconstraint!(instance, c, LessThan(0.0)) # errors\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.cantransformconstraint",
    "page": "Reference",
    "title": "MathOptInterface.cantransformconstraint",
    "category": "Function",
    "text": "Transform Constraint Set\n\ncantransformconstraint(instance::AbstractInstance, c::ConstraintReference{F,S1}, newset::S2)::Bool\n\nReturn a Bool is the set in constraint c can be replaced with newset.\n\nExamples\n\nIf c is a ConstraintReference{ScalarAffineFunction{Float64},LessThan{Float64}},\n\ncantransformconstraint(instance, c, GreaterThan(0.0)) # true\ncantransformconstraint(instance, c, ZeroOne())        # false\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ConstraintName",
    "page": "Reference",
    "title": "MathOptInterface.ConstraintName",
    "category": "Type",
    "text": "ConstraintName()\n\nA string identifying the constraint. It is invalid for two constraints of any kind to have the same name.\n\n\n\n"
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
    "text": "Functions for adding and modifying constraints.isvalid(::AbstractSolverInstance,::ConstraintReference)\ncanaddconstraint\naddconstraint!\naddconstraints!\nmodifyconstraint!\ncanmodifyconstraint\ntransformconstraint!\ncantransformconstraintList of attributes associated with constraints. [category AbstractConstraintAttribute] Calls to get and set! should include as an argument a single ConstraintReference or a vector of ConstraintReference{F,S} objects.ConstraintName\nConstraintPrimalStart\nConstraintDualStart\nConstraintPrimal\nConstraintDual\nConstraintBasisStatus\nConstraintFunction\nConstraintSet"
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
    "text": "VectorQuadraticFunction{T}(affine_outputindex, affine_variables, affine_coefficients, quadratic_outputindex, quadratic_rowvariables, quadratic_colvariables, quadratic_coefficients, constant)\n\nThe vector-valued quadratic function with ith component (\"output index\") defined as frac12x^TQ_ix + a_i^T x + b_i, where:\n\na_i is a sparse vector specified in tuple form by the subset of affine_variables, affine_coefficients for the indices k where affine_outputindex[k] == i.\nb_i is a scalar specified by constant[i]\nQ_i is a symmetric matrix is specified in triplet form by the subset of quadratic_rowvariables, quadratic_colvariables, quadratic_coefficients for the indices k where quadratic_outputindex[k] == i\n\nDuplicate indices in a_i or Q_i are accepted, and the corresponding coefficients are summed together. \"Mirrored\" indices (q,r) and (r,q) (where r and q are VariableReferences) are considered duplicates; only one need be specified.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ScalarConstantChange",
    "page": "Reference",
    "title": "MathOptInterface.ScalarConstantChange",
    "category": "Type",
    "text": "ScalarConstantChange{T}(new_constant)\n\nA struct used to request a change in the constant term of a scalar-valued function. Applicable to ScalarAffineFunction and ScalarQuadraticFunction.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.VectorConstantChange",
    "page": "Reference",
    "title": "MathOptInterface.VectorConstantChange",
    "category": "Type",
    "text": "VectorConstantChange{T}(new_constant)\n\nA struct used to request a change in the constant vector of a vector-valued function. Applicable to VectorAffineFunction and VectorQuadraticFunction.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ScalarCoefficientChange",
    "page": "Reference",
    "title": "MathOptInterface.ScalarCoefficientChange",
    "category": "Type",
    "text": "ScalarCoefficientChange{T}(variable, new_coefficient)\n\nA struct used to request a change in the linear coefficient of a single variable in a scalar-valued function. Applicable to ScalarAffineFunction and ScalarQuadraticFunction.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.MultirowChange",
    "page": "Reference",
    "title": "MathOptInterface.MultirowChange",
    "category": "Type",
    "text": "MultirowChange{T}(variable, rows, new_coefficients)\n\nA struct used to request a change in the linear coefficients of a single variable in a vector-valued function. Applicable to VectorAffineFunction and VectorQuadraticFunction.\n\n\n\n"
},

{
    "location": "apireference.html#Functions-and-function-modifications-1",
    "page": "Reference",
    "title": "Functions and function modifications",
    "category": "section",
    "text": "List of recognized functions.AbstractFunction\nSingleVariable\nVectorOfVariables\nScalarAffineFunction\nVectorAffineFunction\nScalarQuadraticFunction\nVectorQuadraticFunctionList of function modifications.ScalarConstantChange\nVectorConstantChange\nScalarCoefficientChange\nMultirowChange"
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
    "text": "Reals(dimension)\n\nThe set mathbbR^dimension (containing all points) of dimension dimension.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.Zeros",
    "page": "Reference",
    "title": "MathOptInterface.Zeros",
    "category": "Type",
    "text": "Zeros(dimension)\n\nThe set  0 ^dimension (containing only the origin) of dimension dimension.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.Nonnegatives",
    "page": "Reference",
    "title": "MathOptInterface.Nonnegatives",
    "category": "Type",
    "text": "Nonnegatives(dimension)\n\nThe nonnegative orthant  x in mathbbR^dimension  x ge 0  of dimension dimension.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.Nonpositives",
    "page": "Reference",
    "title": "MathOptInterface.Nonpositives",
    "category": "Type",
    "text": "Nonpositives(dimension)\n\nThe nonpositive orthant  x in mathbbR^dimension  x le 0  of dimension dimension.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.GreaterThan",
    "page": "Reference",
    "title": "MathOptInterface.GreaterThan",
    "category": "Type",
    "text": "GreaterThan{T <: Real}(lower::T)\n\nThe set lowerinfty) subseteq mathbbR.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.LessThan",
    "page": "Reference",
    "title": "MathOptInterface.LessThan",
    "category": "Type",
    "text": "LessThan{T <: Real}(upper::T)\n\nThe set (-inftyupper subseteq mathbbR.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.EqualTo",
    "page": "Reference",
    "title": "MathOptInterface.EqualTo",
    "category": "Type",
    "text": "EqualTo{T <: Real}(value::T)\n\nThe set containing the single point x in mathbbR where x is given by value.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.Interval",
    "page": "Reference",
    "title": "MathOptInterface.Interval",
    "category": "Type",
    "text": "Interval{T <: Real}(lower::T,upper::T)\n\nThe interval lower upper subseteq mathbbR. If lower or upper is -Inf or Inf, respectively, the set is interpreted as a one-sided interval.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SecondOrderCone",
    "page": "Reference",
    "title": "MathOptInterface.SecondOrderCone",
    "category": "Type",
    "text": "SecondOrderCone(dimension)\n\nThe second-order cone (or Lorenz cone)  (tx) in mathbbR^dimension  t ge  x _2  of dimension dimension.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.RotatedSecondOrderCone",
    "page": "Reference",
    "title": "MathOptInterface.RotatedSecondOrderCone",
    "category": "Type",
    "text": "RotatedSecondOrderCone(dimension)\n\nThe rotated second-order cone  (tux) in mathbbR^dimension  2tu ge  x _2^2 tu ge 0  of dimension dimension.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.GeometricMeanCone",
    "page": "Reference",
    "title": "MathOptInterface.GeometricMeanCone",
    "category": "Type",
    "text": "GeometricMeanCone(dimension)\n\nThe geometric mean cone  (tx) in mathbbR^n+1  x ge 0 t le sqrtnx_1 x_2 cdots x_n  of dimension dimension=n+1.\n\n\n\n"
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
    "text": "PowerCone{T <: Real}(exponent::T)\n\nThe 3-dimensional power cone  (xyz) in mathbbR^3  x^exponent y^1-exponent = z x ge 0 y ge 0  with parameter exponent.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.DualPowerCone",
    "page": "Reference",
    "title": "MathOptInterface.DualPowerCone",
    "category": "Type",
    "text": "DualPowerCone{T <: Real}(exponent::T)\n\nThe 3-dimensional power cone  (uvw) in mathbbR^3  (fracuexponent)^exponent (fracv1-exponent)^1-exponent ge w u ge 0 v ge 0  with parameter exponent.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.PositiveSemidefiniteConeTriangle",
    "page": "Reference",
    "title": "MathOptInterface.PositiveSemidefiniteConeTriangle",
    "category": "Type",
    "text": "PositiveSemidefiniteConeTriangle(dimension)\n\nThe (vectorized) cone of symmetric positive semidefinite matrices, with off-diagonals unscaled. The entries of the upper triangular part of the matrix are given column by column (or equivalently, the entries of the lower triangular part are given row by row). An n times n matrix has n(n+1)2 lower-triangular elements, so for the vectorized cone of dimension d, the corresponding symmetric matrix has side dimension sqrt14 + 2 d - 12 elements.\n\nExamples\n\nThe matrix\n\nbeginbmatrix\n  1  2  4\n  2  3  5\n  4  5  6\nendbmatrix\n\ncorresponds to (1 2 3 4 5 6) for PositiveSemidefiniteConeTriangle\n\nNote\n\nTwo packed storage formats exist for symmetric matrices, the respective orders of the entries are:\n\nupper triangular column by column (or lower triangular row by row);\nlower triangular column by column (or upper triangular row by row).\n\nThe advantage of the first format is the mapping between the (i, j) matrix indices and the k index of the vectorized form. It is simpler and does not depend on the dimension of the matrix. Indeed,\n\nthe entry of matrix indices (i, j) has vectorized index k = div((j-1)*j, 2) + i if i leq j and k = div((i-1)*i, 2) + j if j leq i;\nand the entry with vectorized index k has matrix indices i = isqrt(2k) and j = k - div((i-1)*i, 2) or j = isqrt(2k) and i = k - div((j-1)*j, 2).\n\nDuality note\n\nThe scalar product for the symmetric matrix in its vectorized form is the sum of the pairwise product of the diagonal entries plus twice the sum of the pairwise product of the upper diagonal entries; see [p. 634, 1]. This has important consequence for duality. Consider for example the following problem\n\nbeginalign*\n     max_x in mathbbR  x\n    \n     textst \n    (1 -x 1)  in textPositiveSemidefiniteConeTriangle(2)\nendalign*\n\nThe dual is the following problem\n\nbeginalign*\n     min_x in mathbbR^3  y_1 + y_3\n    \n     textst  2y_2  = 1\n      y  in textPositiveSemidefiniteConeTriangle(2)\nendalign*\n\nWhy do we use 2y_2 in the dual constraint instead of y_2 ? The reason is that 2y_2 is the scalar product between y and the symmetric matrix whose vectorized form is (0 1 0). Indeed, with our modified scalar products we have\n\nlangle\n(0 1 0)\n(y_1 y_2 y_3)\nrangle\n=\nmathrmtrace\nbeginpmatrix\n  0  1\n  1  0\nendpmatrix\nbeginpmatrix\n  y_1  y_2\n  y_2  y_3\nendpmatrix\n= 2y_2\n\nReferences\n\n[1] Boyd, S. and Vandenberghe, L.. Convex optimization. Cambridge university press, 2004.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.PositiveSemidefiniteConeSquare",
    "page": "Reference",
    "title": "MathOptInterface.PositiveSemidefiniteConeSquare",
    "category": "Type",
    "text": "PositiveSemidefiniteConeSquare(dimension)\n\nThe cone of symmetric positive semidefinite matrices. The entries of the matrix are given column by column (or equivalently, row by row). The matrix is both constrained to be symmetric and and to be positive semidefinite. That is, if the functions in entries (i j) and (j i) are different, then a constraint will be added to make sure that the entries are equal.\n\nExamples\n\nConstraining the matrix\n\nbeginbmatrix\n  1  -y\n  -z  0\nendbmatrix\n\nto be symmetric positive semidefinite can be achieved by constraining the vector (1 -z -y 0) (or (1 -y -z 0)) to belong to the PositiveSemidefiniteConeSquare(2). It both constrains y = z and (1 -y 0) (or (1 -z 0)) to be in PositiveSemidefiniteConeTriangle.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.LogDetConeTriangle",
    "page": "Reference",
    "title": "MathOptInterface.LogDetConeTriangle",
    "category": "Type",
    "text": "LogDetConeTriangle(dimension)\n\nThe Log-Determinant cone  (t X) in mathbbR^1 + d(d+1)2  t le log(det(X))  where the matrix X is represented in the same symmetric packed format as in the PositiveSemidefiniteConeTriangle. The argument dimension is the dimension of the matrix X, i.e., its number of rows or columns.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.LogDetConeSquare",
    "page": "Reference",
    "title": "MathOptInterface.LogDetConeSquare",
    "category": "Type",
    "text": "LogDetConeSquare(dimension)\n\nThe Log-Determinant cone  (t X) in mathbbR^1 + d^2  t le log(det(X)) X text symmetric  where the matrix X is represented in the same format as in the PositiveSemidefiniteConeSquare. Similarly to PositiveSemidefiniteConeSquare, constraints are added to ensures that X is symmetric. The argument dimension is the dimension of the matrix X, i.e., its number of rows or columns.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.RootDetConeTriangle",
    "page": "Reference",
    "title": "MathOptInterface.RootDetConeTriangle",
    "category": "Type",
    "text": "RootDetConeTriangle(dimension)\n\nThe Root-Determinant cone  (t X) in mathbbR^1 + d(d+1)2  t le det(X)^1d  where the matrix X is represented in the same symmetric packed format as in the PositiveSemidefiniteConeTriangle. The argument dimension is the dimension of the matrix X, i.e., its number of rows or columns.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.RootDetConeSquare",
    "page": "Reference",
    "title": "MathOptInterface.RootDetConeSquare",
    "category": "Type",
    "text": "RootDetConeSquare(dimension)\n\nThe Root-Determinant cone  (t X) in mathbbR^1 + d^2  t le det(X)^1d X text symmetric  where the matrix X is represented in the same format as in the PositiveSemidefiniteConeSquare. Similarly to PositiveSemidefiniteConeSquare, constraints are added to ensures that X is symmetric. The argument dimension is the dimension of the matrix X, i.e., its number of rows or columns.\n\n\n\n"
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
    "text": "Semicontinuous{T <: Real}(lower::T,upper::T)\n\nThe set 0 cup lowerupper.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.Semiinteger",
    "page": "Reference",
    "title": "MathOptInterface.Semiinteger",
    "category": "Type",
    "text": "Semiinteger{T <: Real}(lower::T,upper::T)\n\nThe set 0 cup lowerlower+1ldotsupper-1upper.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SOS1",
    "page": "Reference",
    "title": "MathOptInterface.SOS1",
    "category": "Type",
    "text": "SOS1{T <: Real}(weights::Vector{T})\n\nThe set corresponding to the special ordered set (SOS) constraint of type 1. Of the variables in the set, at most one can be nonzero. The weights induce an ordering of the variables; as such, they should be unique values. The kth element in the set corresponds to the kth weight in weights. See here for a description of SOS constraints and their potential uses.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SOS2",
    "page": "Reference",
    "title": "MathOptInterface.SOS2",
    "category": "Type",
    "text": "SOS2{T <: Real}(weights::Vector{T})\n\nThe set corresponding to the special ordered set (SOS) constraint of type 2. Of the variables in the set, at most two can be nonzero, and if two are nonzero, they must be adjacent in the ordering of the set. The weights induce an ordering of the variables; as such, they should be unique values. The kth element in the set corresponds to the kth weight in weights. See here for a description of SOS constraints and their potential uses.\n\n\n\n"
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
    "text": "List of recognized sets.AbstractSet\nReals\nZeros\nNonnegatives\nNonpositives\nGreaterThan\nLessThan\nEqualTo\nInterval\nSecondOrderCone\nRotatedSecondOrderCone\nGeometricMeanCone\nExponentialCone\nDualExponentialCone\nPowerCone\nDualPowerCone\nPositiveSemidefiniteConeTriangle\nPositiveSemidefiniteConeSquare\nLogDetConeTriangle\nLogDetConeSquare\nRootDetConeTriangle\nRootDetConeSquare\nInteger\nZeroOne\nSemicontinuous\nSemiinteger\nSOS1\nSOS2Functions for getting and setting properties of sets.dimension"
},

{
    "location": "apireference.html#MathOptInterface.modifyobjective!",
    "page": "Reference",
    "title": "MathOptInterface.modifyobjective!",
    "category": "Function",
    "text": "modifyobjective!(instance::AbstractInstance, change::AbstractFunctionModification)\n\nApply the modification specified by change to the objective function of instance. To change the function completely, call setobjective! instead.\n\nExamples\n\nmodifyobjective!(instance, ScalarConstantChange(10.0))\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.canmodifyobjective",
    "page": "Reference",
    "title": "MathOptInterface.canmodifyobjective",
    "category": "Function",
    "text": "canmodifyobjective(instance::AbstractInstance, change::AbstractFunctionModification)::Bool\n\nReturn a Bool indicating whether it is possible to apply the modification specified by change to the objective function of instance.\n\nExamples\n\ncanmodifyobjective(instance, ScalarConstantChange(10.0))\n\n\n\n"
},

{
    "location": "apireference.html#Objective-modifications-1",
    "page": "Reference",
    "title": "Objective modifications",
    "category": "section",
    "text": "Functions for modifying objective functions. Use ObjectiveFunction and ObjectiveSense to set and query the objective function.modifyobjective!\ncanmodifyobjective"
},

]}
