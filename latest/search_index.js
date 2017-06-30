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
    "text": "MathOptInterface.jl is a standardized API for Mathematical Optimization solvers.Pages = [\"apimanual.md\",\"apireference.md\"]\nDepth = 3"
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
    "text": "We define the standard form problem as:beginalign\n     min_x in mathbbR^n  f_0(x)\n    \n     textst  f_i(x)  in mathcalS_i  i = 1 ldots m\nendalignAt the moment all functions are described compactly with lists, vectors, and matrices. NLP is a special case discussed later. An objective function f_0 can be affine or quadratic. The constraint functions f_i can be variablewise, affine, or quadratic (to be defined)."
},

{
    "location": "apimanual.html#Duals-1",
    "page": "Manual",
    "title": "Duals",
    "category": "section",
    "text": "So far, we define a convention for duals for conic representable problems. We do not define behavior for duals involving quadratic constraints. We take the convention that duals on lower bounds (GreaterThan) should be nonnegative, duals on upper bounds (LessThan) should be nonpositive, and duals on closed convex cones should belong to the dual cone.For minimization problems in conic form, we can define the primal  as:beginalign\n min_x in mathbbR^n  b_0^Tx\n\n textst  A_ix + b_i  in mathcalC_i  forall i\nendalignand the dual as:beginalign\n max_y_i forall i  -sum_i b_i^T y_i\n\n textst  b_0 - sum_i A_i^T y_i = 0\n\n  y_i in mathcalC_i^*  forall i\nendaligna^Tx + b ge c should be interpreted (for the purposes of duals) as a^Tx + b - c in mathbbR_+, and similarly a^Tx + b le c should be interpreted (for the purposes of duals) as a^Tx + b - c in mathbbR_-. Variablewise constraints should be interpreted as affine constraints with the appropriate identity mapping in place of A_i."
},

{
    "location": "apireference.html#",
    "page": "Reference",
    "title": "Reference",
    "category": "page",
    "text": "CurrentModule = MathOptInterface"
},

{
    "location": "apireference.html#MathOptInterface.AbstractModel",
    "page": "Reference",
    "title": "MathOptInterface.AbstractModel",
    "category": "Type",
    "text": "AbstractModel\n\nAbstract supertype which represents a solver's in-memory representation of an optimization problem.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.AbstractSolver",
    "page": "Reference",
    "title": "MathOptInterface.AbstractSolver",
    "category": "Type",
    "text": "AbstractSolver\n\nAbstract supertype for \"solver\" objects. A solver is a lightweight object used for selecting solvers and parameters. It does not store any instance data.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.Model",
    "page": "Reference",
    "title": "MathOptInterface.Model",
    "category": "Function",
    "text": "Model(solver::AbstractMathProgSolver)\n\nCreate an instance of AbstractModel using the given solver.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.optimize!",
    "page": "Reference",
    "title": "MathOptInterface.optimize!",
    "category": "Function",
    "text": "optimize!(m::AbstractModel)\n\nStart the solution procedure.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.freemodel!",
    "page": "Reference",
    "title": "MathOptInterface.freemodel!",
    "category": "Function",
    "text": "freemodel!(m::AbstractModel)\n\nRelease any resources and memory used by the model. Note that the Julia garbage collector takes care of this automatically, but automatic collection cannot always be forced. This method is useful for more precise control of resources, especially in the case of commercial solvers with licensing restrictions on the number of concurrent runs. Users must discard the model object after this method is invoked.\n\n\n\n"
},

{
    "location": "apireference.html#API-1",
    "page": "Reference",
    "title": "API",
    "category": "section",
    "text": "Some introduction to API. List basic standalone methods.AbstractModel\nAbstractSolverModel\noptimize!\nfreemodel!"
},

{
    "location": "apireference.html#MathOptInterface.VariableReference",
    "page": "Reference",
    "title": "MathOptInterface.VariableReference",
    "category": "Type",
    "text": "VariableReference\n\nA lightweight object used to reference variables in a model.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.candelete-Tuple{MathOptInterface.AbstractModel,MathOptInterface.VariableReference}",
    "page": "Reference",
    "title": "MathOptInterface.candelete",
    "category": "Method",
    "text": "candelete(m::AbstractModel, ref::VariableReference)::Bool\n\nReturn a Bool indicating whether this variable can be removed from the model m.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.isvalid-Tuple{MathOptInterface.AbstractModel,MathOptInterface.VariableReference}",
    "page": "Reference",
    "title": "MathOptInterface.isvalid",
    "category": "Method",
    "text": "isvalid(m::AbstractModel, ref::VariableReference)::Bool\n\nReturn a Bool indicating whether this reference is valid for an active variable in the model m.\n\n\n\n"
},

{
    "location": "apireference.html#Base.delete!-Tuple{MathOptInterface.AbstractModel,MathOptInterface.VariableReference}",
    "page": "Reference",
    "title": "Base.delete!",
    "category": "Method",
    "text": "delete!(m::AbstractModel, ref::VariableReference)\n\nDelete the referenced variable from the model.\n\ndelete!(m::AbstractModel, refs::Vector{VariableReference})\n\nDelete the referenced variables in the vector refs from the model.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.addvariables!",
    "page": "Reference",
    "title": "MathOptInterface.addvariables!",
    "category": "Function",
    "text": "addvariables!(m::AbstractModel, N::Int)::Vector{VariableReference}\n\nAdd N scalar variables to the model, returning a vector of variable references.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.addvariable!",
    "page": "Reference",
    "title": "MathOptInterface.addvariable!",
    "category": "Function",
    "text": "addvariable!(m::AbstractModel)::VariableReference\n\nAdd a scalar variable to the model, returning a variable reference.\n\nIn addition, there is a special case for adding variables to existing linear problems.\n\naddvariable!(m::AbstractModel,\n    cref::Vector{Union{\n            AffineConstraintRef{NonPositive},\n            AffineConstraintRef{NonNegative},\n            AffineConstraintRef{Zero},\n            AffineConstraintRef{Interval}\n        }},\n    coefs)::VariableReference\n\nAdd a variable with coefficients specified by coefs in the existing affine constraints given by the constraint references cref. If you want to add a variable with coefficients in a constraint that is not listed here (such as a quadratic term, or in the SOC), use addvariable!(m) and then modifyconstraint! instead.\n\n\n\n"
},

{
    "location": "apireference.html#Variables-1",
    "page": "Reference",
    "title": "Variables",
    "category": "section",
    "text": "VariableReference\ncandelete(::AbstractModel,::VariableReference)\nisvalid(::AbstractModel,::VariableReference)\ndelete!(::AbstractModel,::VariableReference)\naddvariables!\naddvariable!"
},

{
    "location": "apireference.html#MathOptInterface.setobjective!",
    "page": "Reference",
    "title": "MathOptInterface.setobjective!",
    "category": "Function",
    "text": "setobjective!(m::AbstractModel, b, a_varref::Vector{VariableReference}, a_coef, Q_vari::Vector{VariableReference}, Q_varj::Vector{VariableReference}, Q_coef, N::Int=1)\n\nSet the N'th objective in the model m to be\n\na^Tx + b + frac12x^TQx\n\nwhere a is a sparse vector specified in tuple form by a_varref, and a_coef; b is a scalar; and the symmetric matrix Q is defined by the triplets in Q_vari, Q_varj, Q_coef.\n\nDuplicate indices in either the a vector or the Q matrix are accepted and will be summed together. Off-diagonal entries of Q will be mirrored, so either the upper triangular or lower triangular entries of Q should be provided. If entries for both (ij) and (ji) are provided, these are considered duplicate terms. a_varref, Q_vari, Q_varj should be collections of VariableReference objects.\n\nsetobjective!(m::AbstractModel, b, a_varref::Vector{VariableReference}, a_coef, N::Int=1)\n\nSet the N'th objective in the model m to be\n\na^Tx + b\n\nwhere a is a sparse vector specified in tuple form by a_varref and a_coef and b is a scalar.\n\nDuplicate indices in either the a vector are accepted and will be summed together.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.modifyobjective!",
    "page": "Reference",
    "title": "MathOptInterface.modifyobjective!",
    "category": "Function",
    "text": "modifyobjective!(m::AbstractModel, i::Int, args...)\n\nModify elements of the i'th objective depending on the arguments args. The i'th objective will have the form:\n\n    a_i^Tx + b_i + frac12x^TQ_ix\n\nThere are three cases.\n\nModify Constant term\n\nmodifyobjective!(m::AbstractModel, i::Int, b)\n\nSet the constant term of the i'th row objective to b.\n\nExamples\n\nmodifyobjective!(m, 1, 1.0)\n\nModify Linear term\n\nmodifyobjective!(m::AbstractModel, i::Int, a_varidx, a_coef)\n\nSet elements given by a_varidx in the linear term of the i'th objective to a_coef. Either a_varidx and a_coef are both singletons, or they should be collections with equal length.\n\nThe behaviour of duplicate entries in a_varidx is undefined.\n\nExamples\n\nmodifyobjective!(m, 1, v, 1.0)\nmodifyobjective!(m, 1, [v1, v2], [1.0, 2.0])\n\nModify Quadratic term\n\nmodifyobjective!(m::AbstractModel, i::Int, Q_vari, Q_varj, Q_coef)\n\nSet the elements in the quadratic term of the i'th objective specified by the triplets Q_vari, Q_varj, and Q_coef. Off-diagonal entries will be mirrored. Q_vari, Q_varj should be collections of VariableReference objects.\n\nThe behaviour of duplicate entries is undefined. If entries for both (ij) and (ji) are provided, these are considered duplicate terms.\n\nExamples\n\nmodifyobjective!(m, 1, v1, v2, 1.0)\nmodifyobjective!(m, 1, [v1, v2], [v1, v1], [1.0, 2.0])\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.getobjectiveconstant",
    "page": "Reference",
    "title": "MathOptInterface.getobjectiveconstant",
    "category": "Function",
    "text": "getobjectiveconstant(m, i::Int=1)\n\nReturn the constant term in the i'th objective.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.getobjectiveaffine",
    "page": "Reference",
    "title": "MathOptInterface.getobjectiveaffine",
    "category": "Function",
    "text": "getobjectiveaffine(m, i::Int=1)\n\nReturn the affine part of the i'th objective in tuple form (varref,coef) where varref is a VariableReference, and coef is a coefficient. Output is a tuple of two vectors.\n\ngetobjectiveaffine(m, v::VariableReference, i::Int=1)\n\nReturn the coefficient for the variable v in the affine part of the i'th objective.\n\n\n\n"
},

{
    "location": "apireference.html#Objectives-1",
    "page": "Reference",
    "title": "Objectives",
    "category": "section",
    "text": "How to add and set objectives.setobjective!\nmodifyobjective!\ngetobjectiveconstant\ngetobjectiveaffine"
},

{
    "location": "apireference.html#MathOptInterface.VariablewiseConstraintReference",
    "page": "Reference",
    "title": "MathOptInterface.VariablewiseConstraintReference",
    "category": "Type",
    "text": "VariablewiseConstraintReference{T}\n\nA lightweight object used to reference variablewise constraints in a model. The parameter T is the type of set constraint referenced.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.AffineConstraintReference",
    "page": "Reference",
    "title": "MathOptInterface.AffineConstraintReference",
    "category": "Type",
    "text": "AffineConstraintReference{T}\n\nA lightweight object used to reference affine-in-set constraints in a model. The parameter T is the type of set constraint referenced.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.QuadraticConstraintReference",
    "page": "Reference",
    "title": "MathOptInterface.QuadraticConstraintReference",
    "category": "Type",
    "text": "QuadraticConstraintReference{T}\n\nA lightweight object used to reference quadratic-in-set constraints in a model. The parameter T is the type of set constraint referenced.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.candelete-Tuple{MathOptInterface.AbstractModel,Union{MathOptInterface.AffineConstraintReference, MathOptInterface.QuadraticConstraintReference, MathOptInterface.VariablewiseConstraintReference}}",
    "page": "Reference",
    "title": "MathOptInterface.candelete",
    "category": "Method",
    "text": "candelete(m::AbstractModel, ref::ConstraintReference)::Bool\n\nReturn a Bool indicating whether this constraint can be removed from the model m.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.isvalid-Tuple{MathOptInterface.AbstractModel,Union{MathOptInterface.AffineConstraintReference, MathOptInterface.QuadraticConstraintReference, MathOptInterface.VariablewiseConstraintReference}}",
    "page": "Reference",
    "title": "MathOptInterface.isvalid",
    "category": "Method",
    "text": "isvalid(m::AbstractModel, ref::ConstraintReference)::Bool\n\nReturn a Bool indicating whether this reference is valid for an active constraint in the model m.\n\n\n\n"
},

{
    "location": "apireference.html#Base.delete!-Tuple{MathOptInterface.AbstractModel,Union{MathOptInterface.AffineConstraintReference, MathOptInterface.QuadraticConstraintReference, MathOptInterface.VariablewiseConstraintReference}}",
    "page": "Reference",
    "title": "Base.delete!",
    "category": "Method",
    "text": "delete!(m::AbstractModel, ref::ConstraintReference)\n\nDelete the referenced constraint from the model.\n\ndelete!(m::AbstractModel, refs::Vector{ConstraintReference})\n\nDelete the referenced constraints in the vector refs from the model.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.addconstraint!",
    "page": "Reference",
    "title": "MathOptInterface.addconstraint!",
    "category": "Function",
    "text": "addconstraint!(m::AbstractModel, b, a_constridx, a_varref::Vector{VariableReference}, a_coef, Q_constridx, Q_vari::Vector{VariableReference}, Q_varj::Vector{VariableReference}, Q_coef, S::AbstractSet)::QuadraticConstraintReference{typeof(S)}\n\nAdd the quadratic-in-set constraint\n\nAx + b + q(x) in S\n\nwhere A is a sparse matrix specified in triplet form by a_constridx, a_varref, and a_coef; b is a vector; q(x) is a vector with component (q(x))_k defined to be frac12x^TQ_kx where the symmetric matrix Q_k is defined by the triplets in Q_vari, Q_varj, Q_coef for which Q_constridx equals k; and the set S is defined by S.\n\nDuplicate indices in either the A or the Q matrix are accepted and will be summed together. Off-diagonal entries of Q will be mirrored, so either the upper triangular or lower triangular entries of Q should be provided. If entries for both (ij) and (ji) are provided, these are considered duplicate terms. a_varref, Q_vari, Q_varj should be collections of VariableReference objects.\n\naddconstraint!(m::AbstractModel, b, a_varref::Vector{VariableReference}, a_coef, Q_vari::Vector{VariableReference}, Q_varj::Vector{VariableReference}, Q_coef, S::AbstractSet)::QuadraticConstraintReference{typeof(S)}\n\nA specialized version of addconstraint! for one-dimensional sets. Add the constraint\n\na^Tx + b + frac12x^TQx in S\n\nwhere a is a sparse vector specified in tuple form by a_varref, and a_coef; b is a scalar; the symmetric matrix Q is defined by the triplets in Q_vari, Q_varj, Q_coef; and the set S is defined by S.\n\naddconstraint!(m::AbstractModel, b, a_constridx, a_varref::Vector{VariableReference}, a_coef, S::AbstractSet)::AffineConstraintReference{typeof(S)}\n\nAdd the affine-in-set constraint\n\nAx + b in S\n\nwhere A is a sparse matrix specified in triplet form by a_constridx, a_varref, and a_coef; b is a vector; and the set S is defined by S.\n\nDuplicate indices either A are accepted and will be summed together.\n\naddconstraint!(m::AbstractModel, b, a_varref::Vector{VariableReference}, a_coef, S::AbstractSet)::AffineConstraintReference{typeof(S)}\n\nA specialized version of addconstraint! for one-dimensional sets. Add the constraint\n\na^Tx + b in S\n\nwhere a is a sparse vector specified in tuple form by a_varref, and a_coef; b is a scalar; and the set S is defined by S.\n\naddconstraint!(m::AbstractModel, varref::Vector{VariableReference}, S::AbstractSet)::VariablewiseConstraintReference{typeof(S)}\n\nA specialized version of addconstraint! for variablewise constraints. Add the constraint\n\nx_varref in S\n\nwhere varref is a vector of variable references to specifiy the subset of the subvector of x.\n\naddconstraint!(m::AbstractModel, varref::VariableReference, S::AbstractSet)::VariablewiseConstraintReference{typeof(S)}\n\nA specialized version of addconstraint! for one-dimensional variablewise constraints. Add the constraint\n\nx_varref in S\n\nwhere varref is a single variable references to specifiy the index of x.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.modifyconstraint!",
    "page": "Reference",
    "title": "MathOptInterface.modifyconstraint!",
    "category": "Function",
    "text": "modifyconstraint!(m::AbstractModel, c::ConstraintReference, i::Int, args...)\n\nModify elements of the i'th row of the constraint c depending on the arguments args. The i'th row will have the form\n\n    a_i^Tx + b_i + frac12x^TQ_ix in S\n\nThere are three cases.\n\nModify Constant term\n\nmodifyconstraint!(m::AbstractModel, c::ConstraintReference, i::Int, b)\n\nSet the constant term of the i'th row in the constraint c to b.\n\nExamples\n\nmodifyconstraint!(m, c, 1, 1.0)\n\nModify Linear term\n\nmodifyconstraint!(m::AbstractModel, c::ConstraintReference, i::Int, a_varref::Vector{VariableReference}, a_coef)\n\nSet elements given by a_varref in the linear term of the i'th element in the constraint c to a_coef. Either a_varref and a_coef are both singletons, or they should be collections with equal length.\n\nThe behaviour of duplicate entries in a_varref is undefined.\n\nExamples\n\nmodifyconstraint!(m, c, v, 1.0)\nmodifyconstraint!(m, c, [v1, v2], [1.0, 2.0])\n\nModify Quadratic term\n\nmodifyconstraint!(m::AbstractModel, c::ConstraintReference, i::Int, Q_vari, Q_varj, Q_coef)\n\nSet the elements in the quadratic term of the i'th element of the constraint c specified by the triplets Q_vari, Q_varj, and Q_coef. Off-diagonal entries will be mirrored. Q_vari, Q_varj should be collections of VariableReference objects.\n\nThe behaviour of duplicate entries is undefined. If entries for both (ij) and (ji) are provided, these are considered duplicate terms.\n\nExamples\n\nmodifyconstraint!(m, c, v1, v2, 1.0)\nmodifyconstraint!(m, c, [v1, v2], [v1, v1], [1.0, 2.0])\n\nModify Set\n\nmodifyconstraint!(m::AbstractModel, c::ConstraintReference{S}, set::S)\n\nChange the set of constraint c to the new set set which should be of the same type as the original set.\n\nExamples\n\nIf c is a ConstraintReference{Interval}\n\nmodifyconstraint!(m, c, Interval(0, 5))\nmodifyconstraint!(m, c, NonPositive) # errors\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.getconstraintconstant",
    "page": "Reference",
    "title": "MathOptInterface.getconstraintconstant",
    "category": "Function",
    "text": "getconstraintconstant(m::AbstractModel, c::ConstraintReference)\n\nReturn the b vector of the constraint corresponding to c.\n\ngetconstraintconstant(m::AbstractModel, c::ConstraintReference, i::Int)\n\nReturn the constant term of the ith row of the constraint corresponding to c.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.getconstraintaffine",
    "page": "Reference",
    "title": "MathOptInterface.getconstraintaffine",
    "category": "Function",
    "text": "getconstraintaffine(m::AbstractModel, c::ConstraintReference)\n\nReturn the A matrix of the constraint corresponding to c in triplet form (row,varref,coef) where row is an integer, varref is a VariableReference, and coef is a coefficient. Output is a tuple of three vectors.\n\ngetconstraintaffine(m::AbstractModel, c::ConstraintReference, i::Int)\n\nReturn the ith row of the A matrix of the constraint corresponding to c in tuple form (varref,coef) where varref is a VariableReference, and coef is a coefficient. Output is a tuple of two vectors.\n\ngetconstraintaffine(m::AbstractModel, c::ConstraintReference, i::Int, v::VariableReference)\n\nReturn the element of the A matrix of the constraint corresponding to c in row i and variable v.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.getconstraintquadratic",
    "page": "Reference",
    "title": "MathOptInterface.getconstraintquadratic",
    "category": "Function",
    "text": "getconstraintquadratic(m::AbstractModel, c::ConstraintReference, i::Int)\n\nReturn the Q matrix of the ith row of the constraint corresponding to c in triplet form (varref_a,varref_b,coef) where varref_a is a VariableReference, varref_b is a VariableReference, and coef is a coefficient. Output is a tuple of three vectors. The Q matrix must be symmetric, and only one of the two symmetric elements is returned.\n\ngetconstraintquadratic(m::AbstractModel, c::ConstraintReference, i::Int, v1::VariableReference, v2::VariableReference)\n\nReturn the element (v1,v2) of the Q matrix of the ith row of the constraint corresponding to c.\n\n\n\n"
},

{
    "location": "apireference.html#Constraints-1",
    "page": "Reference",
    "title": "Constraints",
    "category": "section",
    "text": "How to add and modify constraints.VariablewiseConstraintReference\nAffineConstraintReference\nQuadraticConstraintReference\ncandelete(::AbstractModel,::ConstraintReference)\nisvalid(::AbstractModel,::ConstraintReference)\ndelete!(::AbstractModel,::ConstraintReference)\naddconstraint!\nmodifyconstraint!\ngetconstraintconstant\ngetconstraintaffine\ngetconstraintquadratic"
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
    "text": "DualPowerCone(a)\n\nThe 3-dimensional power cone  (uvw) in mathbbR^3  (ua)^a (v(1-a))^1-a = w u ge 0 v ge 0  with parameter a.\n\n\n\n"
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
    "text": "SOS1(weights)\n\nThe set corresponding to the special ordered set (SOS) constraint of type 1. Of the variables in the set, at most one can be nonzero. The weights induce an ordering of the variables; as such, they should be unique values. The k-th element in the set corresponds to the k-th weight in weights. See here for a description of SOS constraints and their potential uses.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SOS2",
    "page": "Reference",
    "title": "MathOptInterface.SOS2",
    "category": "Type",
    "text": "SOS2(weights)\n\nThe set corresponding to the special ordered set (SOS) constraint of type 2. Of the variables in the set, at most two can be nonzero, and if two are nonzero, they must be adjacent in the ordering of the set. The weights induce an ordering of the variables; as such, they should be unique values. The k-th element in the set corresponds to the k-th weight in weights. See here for a description of SOS constraints and their potential uses.\n\n\n\n"
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
    "text": "List of sets.AbstractSet\nReals\nZeros\nNonNegatives\nNonPositives\nGreaterThan\nLessThan\nInterval\nSecondOrderCone\nExponentialCone\nDualExponentialCone\nPowerCone\nDualPowerCone\nPositiveSemidefiniteConeTriangle\nPositiveSemidefiniteConeScaled\nIntegers\nZeroOne\nSOS1\nSOS2Functions for getting and setting properties of sets.dimension"
},

{
    "location": "apireference.html#Attributes-1",
    "page": "Reference",
    "title": "Attributes",
    "category": "section",
    "text": ""
},

{
    "location": "apireference.html#MathOptInterface.ReturnsDuals",
    "page": "Reference",
    "title": "MathOptInterface.ReturnsDuals",
    "category": "Type",
    "text": "ReturnsDuals()\n\nA Bool indicating if the solver should be expected to return dual solutions when appropriate. A solver attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SupportsAddConstraintAfterSolve",
    "page": "Reference",
    "title": "MathOptInterface.SupportsAddConstraintAfterSolve",
    "category": "Type",
    "text": "SupportsAddConstraintAfterSolver()\n\nA Bool indicating if the solver supports adding constraints after a solve. If false, then a new model should be constructed instead. A solver attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SupportsDeleteConstraint",
    "page": "Reference",
    "title": "MathOptInterface.SupportsDeleteConstraint",
    "category": "Type",
    "text": "SupportsDeleteConstraint()\n\nA Bool indicating if the solver supports deleting constraints from a model. A solver attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SupportsAddVariableAfterSolver",
    "page": "Reference",
    "title": "MathOptInterface.SupportsAddVariableAfterSolver",
    "category": "Type",
    "text": "SupportsAddVariableAfterSolve()\n\nA Bool indicating if the solver supports adding variables after a solve. In the context of linear programming, this is known as column generation. A solver attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SupportsQuadraticObjective",
    "page": "Reference",
    "title": "MathOptInterface.SupportsQuadraticObjective",
    "category": "Type",
    "text": "SupportsQuadraticObjective()\n\nA Bool indicating if the solver supports quadratic objectives. A solver attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SupportsConicThroughQuadratic",
    "page": "Reference",
    "title": "MathOptInterface.SupportsConicThroughQuadratic",
    "category": "Type",
    "text": "SupportsConicThroughQuadratic()\n\nA Bool indicating if the solver interprets certain quadratic constraints as second-order cone constraints. A solver attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ObjectiveValue",
    "page": "Reference",
    "title": "MathOptInterface.ObjectiveValue",
    "category": "Type",
    "text": "ObjectiveValue(resultidx::Int=1, objectiveindex::Int=1)\n\nThe objective value of the resultindex'th primal result of the objectiveindex'th objective. A model attribute.\n\nBoth resultindex and objectiveindex default to 1.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ObjectiveBound",
    "page": "Reference",
    "title": "MathOptInterface.ObjectiveBound",
    "category": "Type",
    "text": "ObjectiveBound()\n\nThe best known bound on the optimal objective value. A model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.RelativeGap",
    "page": "Reference",
    "title": "MathOptInterface.RelativeGap",
    "category": "Type",
    "text": "RelativeGap()\n\nThe final relative optimality gap as optimization terminated. That is, fracb-ff, where b is the best bound and f is the best feasible objective value. A model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SolveTime",
    "page": "Reference",
    "title": "MathOptInterface.SolveTime",
    "category": "Type",
    "text": "SolveTime()\n\nThe total elapsed solution time (in seconds) as reported by the solver. A model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.Sense",
    "page": "Reference",
    "title": "MathOptInterface.Sense",
    "category": "Type",
    "text": "Sense()\n\nThe optimization sense of the model, an OptimizationSense with value MinSense or MaxSense. A model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SimplexIterations",
    "page": "Reference",
    "title": "MathOptInterface.SimplexIterations",
    "category": "Type",
    "text": "SimplexIterations()\n\nThe cumulative number of simplex iterations during the optimization process. In particular, for a MIP the total simplex iterations for all nodes. A model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.BarrierIterations",
    "page": "Reference",
    "title": "MathOptInterface.BarrierIterations",
    "category": "Type",
    "text": "BarrierIterations()\n\nThe cumulative number of barrier iterations during the optimization process. A model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.NodeCount",
    "page": "Reference",
    "title": "MathOptInterface.NodeCount",
    "category": "Type",
    "text": "NodeCount()\n\nThe total number of branch-and-bound nodes explored. A model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.RawSolver",
    "page": "Reference",
    "title": "MathOptInterface.RawSolver",
    "category": "Type",
    "text": "RawSolver()\n\nAn object that may be used to access a solver-specific API for this model. A model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.ResultCount",
    "page": "Reference",
    "title": "MathOptInterface.ResultCount",
    "category": "Type",
    "text": "ResultCount()\n\nThe number of results available. A model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.NumberOfVariables",
    "page": "Reference",
    "title": "MathOptInterface.NumberOfVariables",
    "category": "Type",
    "text": "NumberOfVariables()\n\nThe number of variables in the model. A model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.NumberOfVariablewiseConstraints",
    "page": "Reference",
    "title": "MathOptInterface.NumberOfVariablewiseConstraints",
    "category": "Type",
    "text": "NumberOfVariablewiseConstraints{T}()\n\nThe number of variablewise constraints of type T in the model. A model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.NumberOfAffineConstraints",
    "page": "Reference",
    "title": "MathOptInterface.NumberOfAffineConstraints",
    "category": "Type",
    "text": "NumberOfAffineConstraints{T}()\n\nThe number of affine constraints of type T in the model. A model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.NumberOfQuadraticConstraints",
    "page": "Reference",
    "title": "MathOptInterface.NumberOfQuadraticConstraints",
    "category": "Type",
    "text": "NumberOfQuadraticConstraints{T}()\n\nThe number of quadratic constraints of type T in the model. A model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SupportsVariablewiseConstraint",
    "page": "Reference",
    "title": "MathOptInterface.SupportsVariablewiseConstraint",
    "category": "Type",
    "text": "SupportsVariablewiseConstraint{T}()\n\nA Bool indicating whether the solver or model supports a variablewise constraint in the set S which is a set of type T. A solver and model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SupportsAffineConstraint",
    "page": "Reference",
    "title": "MathOptInterface.SupportsAffineConstraint",
    "category": "Type",
    "text": "SupportsAffineConstraint{T}()\n\nA Bool indicating whether the solver or model supports a constraint of of the form \"affine expression\" in S where S is a set of type T. A solver and model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.SupportsQuadraticConstraint",
    "page": "Reference",
    "title": "MathOptInterface.SupportsQuadraticConstraint",
    "category": "Type",
    "text": "SupportsQuadraticConstraint{T}()\n\nA Bool indicating whether the solver or model supports a constraint of of the form \"quadratic expression\" in S where S is a set of type T. A solver and model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.TerminationStatus",
    "page": "Reference",
    "title": "MathOptInterface.TerminationStatus",
    "category": "Type",
    "text": "TerminationStatus()\n\nA TerminationStatusCode explaining why the solver stopped. A model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.PrimalStatus",
    "page": "Reference",
    "title": "MathOptInterface.PrimalStatus",
    "category": "Type",
    "text": "PrimalStatus(N)\nPrimalStatus()\n\nThe ResultStatusCode of the primal result N. If N is omitted, it defaults to 1. A model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.DualStatus",
    "page": "Reference",
    "title": "MathOptInterface.DualStatus",
    "category": "Type",
    "text": "DualStatus(N)\nDualStatus()\n\nThe ResultStatusCode of the dual result N. If N is omitted, it defaults to 1. A model attribute.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.AbstractSolverOrModelAttribute",
    "page": "Reference",
    "title": "MathOptInterface.AbstractSolverOrModelAttribute",
    "category": "Type",
    "text": "AbstractSolverOrModelAttribute\n\nAbstract supertype for attribute objects that can be used to set or get attributes (properties) of the model or solver.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.AbstractVariableAttribute",
    "page": "Reference",
    "title": "MathOptInterface.AbstractVariableAttribute",
    "category": "Type",
    "text": "AbstractVariableAttribute\n\nAbstract supertype for attribute objects that can be used to set or get attributes (properties) of variables in the model.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.AbstractConstraintAttribute",
    "page": "Reference",
    "title": "MathOptInterface.AbstractConstraintAttribute",
    "category": "Type",
    "text": "AbstractConstraintAttribute\n\nAbstract supertype for attribute objects that can be used to set or get attributes (properties) of constraints in the model.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.cangetattribute",
    "page": "Reference",
    "title": "MathOptInterface.cangetattribute",
    "category": "Function",
    "text": "cangetattribute(s::AbstractSolver, attr::AbstractSolverOrModelAttribute)::Bool\n\nReturn a Bool indicating whether it is possible to query attribute attr from the solver s.\n\ncangetattribute(m::AbstractModel, attr::AbstractVariableAttribute, R::Type{VariableReference})::Bool\ncangetattribute(m::AbstractModel, attr::AbstractConstraintAttribute, R::Type{VariablewiseConstraintReference{T})::Bool\ncangetattribute(m::AbstractModel, attr::AbstractConstraintAttribute, R::Type{AffineConstraintReference{T})::Bool\ncangetattribute(m::AbstractModel, attr::AbstractConstraintAttribute, R::Type{QuadraticConstraintReference{T})::Bool\n\nReturn a Bool indicating whether the model m currently has a value for the attributed specified by attribute type attr applied to the reference type R.\n\nExamples\n\n```julia cangetattribute(GurobiSolver(), SupportsAffineConstraint{Zero}()) cangetattribute(m, ObjectiveValue()) cangetattribute(m, VariablePrimalStart(), varref) cangetattribute(m, ConstraintPrimal(), conref)\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.getattribute",
    "page": "Reference",
    "title": "MathOptInterface.getattribute",
    "category": "Function",
    "text": "getattribute(s::AbstractSolver, attr::AbstractSolverOrModelAttribute)\n\nReturn an attribute attr of the solver s.\n\ngetattribute(m::AbstractModel, attr::AbstractSolverOrModelAttribute)\n\nReturn an attribute attr of the model m.\n\ngetattribute(m::AbstractModel, attr::AbstractVariableAttribute, v::VariableReference)\n\nReturn an attribute attr of the variable v in model m.\n\ngetattribute(m::AbstractModel, attr::AbstractVariableAttribute, v::Vector{VariableReference})\n\nReturn a vector of attributes corresponding to each variable in the collection v in the model m.\n\ngetattribute(m::AbstractModel, attr::AbstractConstraintAttribute, c::ConstraintReference)\n\nReturn an attribute attr of the constraint c in model m.\n\ngetattribute(m::AbstractModel, attr::AbstractConstraintAttribute, c::Vector{VariablewiseConstraintReference{T}})\ngetattribute(m::AbstractModel, attr::AbstractConstraintAttribute, c::Vector{AffineConstraintReference{T}})\ngetattribute(m::AbstractModel, attr::AbstractConstraintAttribute, c::Vector{QuadraticConstraintReference{T}})\n\nReturn a vector of attributes corresponding to each constraint in the collection c in the model m.\n\nExamples\n\ngetattribute(m, ObjectiveValue())\ngetattribute(m, VariableResult(), ref)\ngetattribute(m, VariableResult(5), [ref1,ref2])\ngetattribute(m, OtherAttribute(\"something specific to cplex\"))\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.getattribute!",
    "page": "Reference",
    "title": "MathOptInterface.getattribute!",
    "category": "Function",
    "text": "getattribute!(output, m::AbstractModel, args...)\n\nAn in-place version of getattribute. The signature matches that of getattribute except that the the result is placed in the vector output.\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.cansetattribute",
    "page": "Reference",
    "title": "MathOptInterface.cansetattribute",
    "category": "Function",
    "text": "cansetattribute(s::AbstractSolver, attr::AbstractSolverOrModelAttribute)::Bool\n\nReturn a Bool indicating whether it is possible to set attribute attr in the solver s.\n\ncansetattribute(m::AbstractModel, attr::AbstractVariableAttribute, R::Type{VariableReference})::Bool\ncansetattribute(m::AbstractModel, attr::AbstractConstraintAttribute, R::Type{VariablewiseConstraintReference{T})::Bool\ncangetattribute(m::AbstractModel, attr::AbstractConstraintAttribute, R::Type{AffineConstraintReference{T})::Bool\ncangetattribute(m::AbstractModel, attr::AbstractConstraintAttribute, R::Type{QuadraticConstraintReference{T})::Bool\n\nReturn a Bool indicating whether it is possible to set attribute attr applied to the reference type R in the model m.\n\nExamples\n\n```julia cansetattribute(GurobiSolver(), SupportsAffineConstraint{Zero}()) cansetattribute(m, ObjectiveValue()) cansetattribute(m, VariablePrimalStart(), VariableReference) cansetattribute(m, ConstraintPrimal(), AffineConstraintReference{NonNegative})\n\n\n\n"
},

{
    "location": "apireference.html#MathOptInterface.setattribute!",
    "page": "Reference",
    "title": "MathOptInterface.setattribute!",
    "category": "Function",
    "text": "setattribute!(s::AbstractSolver, attr::AbstractSolverOrModelAttribute, value)\n\nAssign value to the attribute attr of the solver s.\n\nsetattribute!(m::AbstractModel, attr::AbstractSolverOrModelAttribute, value)\n\nAssign value to the attribute attr of the model m.\n\nsetattribute!(m::AbstractModel, attr::AbstractVariableAttribute, v::VariableReference, value)\n\nAssign value to the attribute attr of variable v in model m.\n\nsetattribute!(m::AbstractModel, attr::AbstractVariableAttribute, v::Vector{VariableReference}, vector_of_values)\n\nAssign a value respectively to the attribute attr of each variable in the collection v in model m.\n\nsetattribute!(m::AbstractModel, attr::AbstractConstraintAttribute, c::ConstraintReference, value)\n\nAssign a value to the attribute attr of constraint c in model m.\n\nsetattribute!(m::AbstractModel, attr::AbstractConstraintAttribute, c::Vector{VariablewiseConstraintReference{T}})\nsetattribute!(m::AbstractModel, attr::AbstractConstraintAttribute, c::Vector{AffineConstraintReference{T}})\nsetattribute!(m::AbstractModel, attr::AbstractConstraintAttribute, c::Vector{QuadraticConstraintReference{T}})\n\nAssign a value respectively to the attribute attr of each constraint in the collection c in model m.\n\n\n\n"
},

{
    "location": "apireference.html#Solver-or-Model-Attributes-1",
    "page": "Reference",
    "title": "Solver or Model Attributes",
    "category": "section",
    "text": "List of solver or model attributes.ReturnsDuals\nSupportsAddConstraintAfterSolve\nSupportsDeleteConstraint\nSupportsAddVariableAfterSolver\nSupportsQuadraticObjective\nSupportsConicThroughQuadratic\nObjectiveValue\nObjectiveBound\nRelativeGap\nSolveTime\nSense\nSimplexIterations\nBarrierIterations\nNodeCount\nRawSolver\nResultCount\nNumberOfVariables\nNumberOfVariablewiseConstraints\nNumberOfAffineConstraints\nNumberOfQuadraticConstraints\nSupportsVariablewiseConstraint\nSupportsAffineConstraint\nSupportsQuadraticConstraint\nTerminationStatus\nPrimalStatus\nDualStatusFunctions for getting and setting model or solver attributes.AbstractSolverOrModelAttribute\nAbstractVariableAttribute\nAbstractConstraintAttribute\ncangetattribute\ngetattribute\ngetattribute!\ncansetattribute\nsetattribute!"
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
    "location": "apireference.html#Variable-Attributes-1",
    "page": "Reference",
    "title": "Variable Attributes",
    "category": "section",
    "text": "List of attributes associated with variables. Calls to getattribute and setattribute! should include as an argument a single VariableReference or a vector of VariableReference objects.VariablePrimalStart\nVariablePrimal\nVariableBasisStatus"
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
    "location": "apireference.html#Constraint-Attributes-1",
    "page": "Reference",
    "title": "Constraint Attributes",
    "category": "section",
    "text": "List of attributes associated with constraints. Calls to getattribute and setattribute! should include as an argument a single ConstraintReference or a vector of ConstriaintReference{T} objects.ConstraintPrimalStart\nConstraintDualStart\nConstraintPrimal\nConstraintDual\nConstraintBasisStatus"
},

{
    "location": "apireference.html#Status-Codes-1",
    "page": "Reference",
    "title": "Status Codes",
    "category": "section",
    "text": ""
},

{
    "location": "apireference.html#MathOptInterface.TerminationStatusCode",
    "page": "Reference",
    "title": "MathOptInterface.TerminationStatusCode",
    "category": "Type",
    "text": "TerminationStatusCode\n\nAn Enum of possible values for the TerminationStatus attribute. This attribute is meant to explain the reason why the solver stopped executing.\n\nOK\n\nThese are generally OK statuses.\n\nSuccess: the algorithm ran successfully and has a result. This includes cases where the algorithm converges to an infeasible point (NLP) or converges to a solution of a homogeneous self-dual problem and has a certificate of primal/dual infeasibility.\nAlmostSuccess: the algorithm almost ran successfully (e.g., to relaxed convergence tolerances) and has a result.\nInfeasibleNoResult: the algorithm stopped because it decided that the problem is infeasible but does not have a result to return.\nUnboundedNoResult: the algorithm stopped because it decided that the problem is unbounded but does not have a result to return.\nInfeasibleOrUnbounded: the algorithm stopped because it decided that the problem is infeasible or unbounded; no result is available. This occasionally happens during MIP presolve.\n\nLimits\n\nThe solver stopped because of some user-defined limit. To be documented: IterationLimit, TimeLimit, NodeLimit, SolutionLimit, MemoryLimit, ObjectiveLimit, NormLimit, OtherLimit.\n\nProblematic\n\nThis group of statuses means that something unexpected or problematic happened.\n\nSlowProgress: the algorithm stopped because it was unable to continue making progress towards the solution. AlmostSuccess should be used if there is additional information that relaxed convergence tolerances are satisfied.\n\nTo be documented: NumericalError, InvalidModel, InvalidOption, Interrupted, OtherError.\n\n\n\n"
},

{
    "location": "apireference.html#Termination-Status-1",
    "page": "Reference",
    "title": "Termination Status",
    "category": "section",
    "text": "The TerminationStatus attribute is meant to explain the reason why the solver stopped executing. The value of the attribute is of type TerminationStatusCode.TerminationStatusCode"
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
    "text": "The PrimalStatus and DualStatus attributes are meant to explain how to interpret the result returned by the solver. The value of the attributes are of type ResultStatusCode.ResultStatusCode"
},

{
    "location": "apireference.html#MathOptInterface.BasisStatusCode",
    "page": "Reference",
    "title": "MathOptInterface.BasisStatusCode",
    "category": "Type",
    "text": "BasisStatusCode\n\nAn Enum of possible values for the VariableBasisStatus and ConstraintBasisStatus attribute. This explains the status of a given element with respect to an optimal solution basis. Possible values are:     * Basic: element is in the basis.     * Nonbasic: element is not in the basis.     * NonbasicAtLower: element is not in the basis and is at its lower bound.     * NonbasicAtUpper: element is not in the basis and is at its upper bound.     * SuperBasic: element is not in the basis but is also not at one of its bounds.\n\n\n\n"
},

{
    "location": "apireference.html#Basis-Status-1",
    "page": "Reference",
    "title": "Basis Status",
    "category": "section",
    "text": "BasisStatusCode"
},

]}
